import {} from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, merge, map } from 'rxjs';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { User } from 'src/app/models/User';

import { GithubService } from 'src/app/services/github.service';
import { addNewUsers, setFullUser } from 'src/app/store/users/user.actions';
import {
  selectLoggedUser,
  selectUsers,
} from 'src/app/store/users/user.selectors';
import { FullUser } from '../../../models/FullUser';
import { DynamicDataSource } from './dynamicDataSource';

@Component({
  selector: 'app-users-tree',
  templateUrl: './users-tree.component.html',
  styleUrls: ['./users-tree.component.css'],
})
export class UsersTreeComponent implements OnInit {
  loggedUser: User;

  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  loading = false;

  public selectedNode: DynamicFlatNode = {
    expandable: false,
    isLoading: false,
    login: '',
    level: -1,
    id: -1,
  };

  constructor(
    private githubService: GithubService,
    private store: Store<{ users: DynamicFlatNode[] }>,
    private router: Router
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new DynamicDataSource(
      this.treeControl,
      this.githubService,
      store
    );
  }

  ngOnInit(): void {
    let test = true;
    this.store.select(selectUsers).subscribe((users) => {
      this.dataSource.data = [...users];
    });

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

    if (this.dataSource.data.length === 0) {
      this.githubService.getUsers().subscribe((allUsers) => {
        const myselect: DynamicFlatNode[] = allUsers.map((p: FullUser) => {
          return {
            id: p.id,
            login: p.login,
            level: 1,
            expandable: true,
            isLoading: false,
            repositories: p.repos_url,
          };
        });
        myselect.forEach((oneUser) => {
          this.store.dispatch(addNewUsers({ users: oneUser }));
        });
      });
    }
  }

  handleChange(node: DynamicFlatNode) {
    if (this.selectedNode.id === node.id) {
      this.selectedNode.id = -1;
    } else {
      this.selectedNode = { ...node };
    }
  }

  setUserInStore(fullUser: DynamicFlatNode) {
    this.loading = true;
    this.router.navigate(['/users/' + fullUser.login]).then(() => {
      this.loading = false;
    });
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
