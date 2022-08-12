import {
  DataSource,
  CollectionViewer,
  SelectionChange,
} from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, merge, map } from 'rxjs';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { Repo } from 'src/app/models/Repo';
import { GithubService } from 'src/app/services/github.service';
import { updateUserInList } from 'src/app/store/users/user.actions';

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
    private _database: GithubService,
    private store: Store
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

  /** Handle expand/collapse behaviors */
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

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    // console.log(nodeInList)
    // let node = {...nodeInList}
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

    let children: Repo[] = [];
    if (node.repositories)
      this._database
        .getRepsitoriesOfUser(node.repositories)
        .subscribe((allRepos) => {
          children = allRepos;

          if (!children || index < 0) {
            // If no children, or cannot find the node, no op
            return;
          }

          let myNode = { ...node };
          myNode.isLoading = true;

          setTimeout(() => {
            const nodes = children.map(
              (name) =>
                new DynamicFlatNode(
                  name.id,
                  name.name,
                  myNode.level + 1,
                  false,
                  false
                )
            );

            this.data.splice(index + 1, 0, ...nodes);
            this.dataChange.next(this.data);
            myNode.isLoading = false;
          }, 400);
        });
  }
}
