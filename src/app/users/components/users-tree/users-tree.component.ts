import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, merge, map } from 'rxjs';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { ExampleFlatNode } from 'src/app/models/ExampleFlatNode';
import { GithubService } from 'src/app/services/github.service';
import {UserNode} from '../../../models/UserNode'
import { DynamicDataSource } from './dynamicDataSource';


@Component({
  selector: 'app-users-tree',
  templateUrl: './users-tree.component.html',
  styleUrls: ['./users-tree.component.css']
})
export class UsersTreeComponent implements OnInit {

  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;

  constructor(private githubService: GithubService) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new DynamicDataSource(this.treeControl, this.githubService);

    this.githubService.getUsers().subscribe(allUsers => {
      console.log(allUsers)
      const myselect: DynamicFlatNode[] = allUsers
      .map((p: { id: number; login: string; repos_url: string}) => {
        return { id: p.id, item: p.login, level: 1, expandable: true, isLoading: false, repositories: p.repos_url } });

      console.log(myselect)
      this.dataSource.data = myselect
    })

   }



  ngOnInit(): void {

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
