import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Repo } from 'src/app/models/Repo';
import { User } from 'src/app/models/User';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-repo-table',
  templateUrl: './repo-table.component.html',
  styleUrls: ['./repo-table.component.css']
})
export class RepoTableComponent {
  displayedColumns: string[] = ['name', 'desc', 'stars', 'watchers', 'created', 'updated'];
  dataSource: MatTableDataSource<Repo>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  repositories: Repo[] = [];

  constructor(private githubService: GithubService) {
    this.dataSource = new MatTableDataSource(this.repositories);
   }

  setRepo(repos: Repo[]){
    this.repositories = [...repos];
    this.dataSource = new MatTableDataSource(this.repositories);
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort){
    const data = this.repositories.slice();
    if (!sort.active || sort.direction === '') {
      this.repositories = data;
      return;
    }

    this.repositories = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'description':
          return this.compare(a.description.charAt(0), b.description.charAt(0), isAsc);
        case 'stars':
          return this.compare(a.stargazers_count, b.stargazers_count, isAsc);
        case 'watchers':
          return this.compare(a.watchers, b.watchers, isAsc);
        case 'created':
          return this.compare(new Date(a.created_at).getTime(), new Date(b.created_at).getTime(), isAsc);
        case 'updated':
          return this.compare(new Date(a.updated_at).getTime(), new Date(b.updated_at).getTime(), isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}



