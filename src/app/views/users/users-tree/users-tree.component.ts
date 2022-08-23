import {} from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { UsersStateInterface } from 'src/app/models/stateModels/UsersStateInterface';
import { User } from 'src/app/models/User';

import { GithubService } from 'src/app/services/github.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { retrieveFullUser } from 'src/app/store/fullUser/users/usersList.actions';
import { getUserSelector } from 'src/app/store/fullUser/users/usersList.selectors';
import { loggedUsersSelector } from 'src/app/store/loggedUser/users/loggedUser.selectors';
import { retrieveUsers } from 'src/app/store/users/user.actions';
import {
  errorSelector,
  isLoadingSelector,
  usersSelector,
} from 'src/app/store/users/user.selectors';
import { DynamicDataSource } from './dynamicDataSource';

@Component({
  selector: 'app-users-tree',
  templateUrl: './users-tree.component.html',
  styleUrls: ['./users-tree.component.scss'],
})
export class UsersTreeComponent implements OnInit, OnDestroy {
  loggedUser: User;

  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  loading = false;

  selectedUser: User | null;

  selectedNode: DynamicFlatNode = {
    expandable: false,
    isLoading: false,
    level: -1,
    user: {
      email: '',
      id: -1,
      login: '',
      repos_url: '',
      avatar_url: '',
      followers: -1,
      name: '',
      public_repos: -1,
    },
  };

  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  dataToTree$: Subscription;
  loggedUser$: Subscription;

  constructor(
    private githubService: GithubService,
    private store: Store<UsersStateInterface>,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new DynamicDataSource(
      this.treeControl,
      this.githubService
    );
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.errorMessage$ = this.store.select(errorSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(
      retrieveUsers({ fromUserId: 0, authToken: this.loggedUser?.token })
    );
    this.dataToTree$ = this.store
      .pipe(select(usersSelector))
      .subscribe((users) => {
        this.dataSource.data = JSON.parse(JSON.stringify(users));
      });

    this.loadLoggedUser();
  }

  ngOnDestroy(): void {
    this.dataToTree$.unsubscribe();
    this.loggedUser$.unsubscribe();
  }

  loadLoggedUser() {
    this.loggedUser$ = this.store
      .select(loggedUsersSelector)
      .subscribe((state) => {
        this.loggedUser = state.user;
      });
  }

  loadMoreUsers() {
    const lastUserId = Math.max(
      ...this.dataSource.data.map((o) => {
        if (o && o.user !== undefined) {
          return o.user.id;
        } else {
          return 0;
        }
      })
    );

    this.store.dispatch(retrieveUsers({ fromUserId: lastUserId }));
  }

  handleChange(node: DynamicFlatNode) {
    if (
      this.selectedNode.user &&
      this.selectedNode.user?.id === node.user?.id
    ) {
      let user = {
        email: '',
        id: -1,
        login: '',
        repos_url: '',
        avatar_url: '',
        followers: -1,
        name: '',
        public_repos: -1,
      };
      this.selectedNode = { ...this.selectedNode, user };
      this.selectedUser = null;
    } else {
      this.selectedUser = null;
      this.selectedNode = { ...node };
      this.getUser();
    }
  }

  getUser() {
    if (this.selectedNode.user)
      this.store
        .pipe(select(getUserSelector(this.selectedNode.user.login)))
        .subscribe((user) => {
          if (!user) {
            this.loadFullUser();
          } else {
            this.selectedUser = { ...user };
          }
        });
  }

  loadFullUser() {
    if (this.selectedNode.user)
      this.store.dispatch(
        retrieveFullUser({ login: this.selectedNode.user.login })
      );
  }

  setUserInStore(dynamicNode: DynamicFlatNode) {
    if (dynamicNode.user) {
      this.loading = true;
      this.router.navigate(['/users/' + dynamicNode.user.login]).then(() => {
        this.loading = false;
      });
    }
  }

  getLevel = (node: DynamicFlatNode) => {
    return node.level;
  };

  isExpandable = (node: DynamicFlatNode) => {
    return node.expandable;
  };

  hasChild = (_: number, _nodeData: DynamicFlatNode) => {
    return _nodeData.expandable;
  };
}
