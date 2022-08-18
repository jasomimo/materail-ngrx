import {} from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { User } from 'src/app/models/User';

import { GithubService } from 'src/app/services/github.service';
import { addFullUser, addNewUsers } from 'src/app/store/users/user.actions';
import {
  selectFullUser,
  selectLoggedUser,
  selectUsers,
} from 'src/app/store/users/user.selectors';
import { DynamicDataSource } from './dynamicDataSource';

@Component({
  selector: 'app-users-tree',
  templateUrl: './users-tree.component.html',
  styleUrls: ['./users-tree.component.scss'],
})
export class UsersTreeComponent implements OnInit {
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

  constructor(
    private githubService: GithubService,
    private store: Store,
    private router: Router
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new DynamicDataSource(
      this.treeControl,
      this.githubService
    );
  }

  ngOnInit(): void {
    this.store.select(selectUsers).subscribe((users) => {
      this.dataSource.data = [...users];
    });

    this.loadLoggedUser();
    this.loadDataOnBeggining();
  }

  loadLoggedUser() {
    this.store.select(selectLoggedUser).subscribe((loggedUser) => {
      if (loggedUser.id >= 0) {
        this.loggedUser = loggedUser;
      } else {
        this.loggedUser = {
          login: 'Unknown',
          followers: -1,
          avatar_url: 'https://avatars.githubusercontent.com/u/9919?s=40&v=4',
          id: -1,
          name: 'Unknown user',
          public_repos: -1,
        };
      }
    });
  }

  loadDataOnBeggining() {
    if (this.dataSource.data.length === 0) {
      this.githubService.getUsers(0).subscribe((allUsers) => {
        const myselect: DynamicFlatNode[] = allUsers.map((p: User) => {
          return {
            level: 1,
            expandable: true,
            isLoading: false,
            user: p,
          };
        });
        myselect.forEach((oneUser) => {
          this.store.dispatch(addNewUsers({ users: oneUser }));
        });
      });
    }
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

    this.githubService
      .getUsers(lastUserId)
      .pipe(take(1))
      .subscribe((allUsers) => {
        const myselect: DynamicFlatNode[] = allUsers.map((p: User) => {
          return {
            level: 1,
            expandable: true,
            isLoading: false,
            user: p,
          };
        });
        myselect.forEach((oneUser) => {
          this.store.dispatch(addNewUsers({ users: oneUser }));
        });
      });
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
    this.store.select(selectFullUser).subscribe((users) => {
      const myUSer = users.find(
        (oneUser) => oneUser.id === this.selectedNode.user?.id
      );
      if (!myUSer) {
        this.loadFullUser();
      } else {
        this.selectedUser = { ...myUSer };
      }
    });
  }

  loadFullUser() {
    if (this.selectedNode.user)
      this.githubService
        .getFullUser(this.selectedNode.user.login)
        .subscribe((user) => {
          this.store.dispatch(addFullUser({ user: user }));
        });
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
