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
import {
  updateAllList,
  updateUserInList,
} from 'src/app/store/users/user.actions';
import { selectUsers } from 'src/app/store/users/user.selectors';

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

    const nodes = this.data.map((name) => {
      if (name.user?.id === node.user?.id) {
        return new DynamicFlatNode(
          name.level,
          node.expandable,
          true,
          name.user,
          undefined
        );
      } else {
        return new DynamicFlatNode(
          name.level,
          node.expandable,
          node.isLoading,
          name.user,
          undefined
        );
      }
    });
    let oneDynamicNode = this.data.find(
      (oneD) => oneD.user?.id === node.user?.id
    );

    let newVariable: DynamicFlatNode;
    if (oneDynamicNode) {
      newVariable = Object.assign(JSON.parse(JSON.stringify(oneDynamicNode)));
      newVariable.isLoading = true;
      // this.store.dispatch(updateUserInList({ user: newVariable }));
    }

    // setTimeout(() => {
    //   if (node.user) {
    //     this.data.splice(node.user?.id - 1, 1);
    //     this.data.splice(node.user?.id - 1, 0, newVariable);
    //     this.dataChange.next(this.data);
    //   }
    // }, 500);

    let children: Repo[] = [];
    if (node.user?.repos_url)
      this._database
        .getRepsitoriesOfUser(node.user.repos_url)
        .subscribe((allRepos) => {
          children = allRepos;

          if (!children || index < 0) {
            // If no children, or cannot find the node, no op
            return;
          }

          const nodes = children.map(
            (name) =>
              new DynamicFlatNode(node.level + 1, false, false, undefined, name)
          );

          this.data.splice(index + 1, 0, ...nodes);
          this.dataChange.next(this.data);
          // myNode.isLoading = false;
          // this.store.dispatch(updateAllList({ user: this.data }));
        });
  }
}
