import {
  DataSource,
  CollectionViewer,
  SelectionChange,
} from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject, Observable, merge, map } from 'rxjs';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { Repo } from 'src/app/models/Repo';
import { GithubService } from 'src/app/services/github.service';

export class DynamicDataSource implements DataSource<DynamicFlatNode> {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private _treeControl: FlatTreeControl<DynamicFlatNode>,
    private _database: GithubService
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe((change) => {
      if (
        (change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(
      map(() => this.data)
    );
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach((node) => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach((node) => this.toggleNode(node, false));
    }
  }

  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const index = this.data.indexOf(node);
    if (!expand) {
      let count = 0;
      for (
        let i = index + 1;
        i < this.data.length && this.data[i].level > node.level;
        i++, count++
      ) {}
      this.data.splice(index + 1, count);

      this.dataChange.next(this.data);
      return;
    }
    node.isLoading = true;
    let children: Repo[] = [];
    if (node.user?.repos_url)
      this._database
        .getRepsitoriesOfUser(node.user.repos_url)
        .subscribe((allRepos) => {
          children = allRepos;

          if (!children || index < 0) {
            return;
          }

          const nodes = children.map(
            (name) =>
              new DynamicFlatNode(node.level + 1, false, false, undefined, name)
          );
          node.isLoading = false;
          this.data.splice(index + 1, 0, ...nodes);
          this.dataChange.next(this.data);
        });
  }
}
