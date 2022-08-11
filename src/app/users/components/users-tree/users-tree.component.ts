import { CollectionViewer, SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, merge, map } from 'rxjs';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { ExampleFlatNode } from 'src/app/models/ExampleFlatNode';
import { GithubService } from 'src/app/services/github.service';
import { addNewUsers, setFullUser } from 'src/app/store/users/user.actions';
import { selectUsers } from 'src/app/store/users/user.selectors';
import {UserNode} from '../../../models/UserNode'
import { DynamicDataSource } from './dynamicDataSource';


@Component({
  selector: 'app-users-tree',
  templateUrl: './users-tree.component.html',
  styleUrls: ['./users-tree.component.css']
})
export class UsersTreeComponent{

  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  public selectedNode: DynamicFlatNode = {expandable: false, isLoading: false, login: '', level: -1, id: -1}


  constructor(private githubService: GithubService, private store: Store<{ users: DynamicFlatNode[] }> ,
            private router: Router) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new DynamicDataSource(this.treeControl, this.githubService);

    this.store.select(selectUsers).subscribe(users => {
      this.dataSource.data = [...users]
    })

    if(this.dataSource.data.length === 0){
      this.githubService.getUsers().subscribe(allUsers => {
        const myselect: DynamicFlatNode[] = allUsers
        .map((p: { id: number; login: string; repos_url: string}) => {
          return { id: p.id, login: p.login, level: 1, expandable: true, isLoading: false, repositories: p.repos_url } });
              myselect.forEach(oneUser => {
                this.store.dispatch(addNewUsers({users: oneUser}))

              })
      })
    }

   }

   handleChange(node: DynamicFlatNode){
    if(this.selectedNode.id === node.id){
      this.selectedNode.id = -1
    }else{
      this.selectedNode = {...node};
    }
   }

   setUserInStore(){
      this.githubService.getFullUser(this.selectedNode.login).subscribe(fullUser => {
        this.store.dispatch(setFullUser({user: fullUser}))
        this.router.navigate(['/users/detail']);
      })
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
