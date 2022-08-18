import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Repo } from 'src/app/models/Repo';
import { User } from 'src/app/models/User';
import { GithubService } from 'src/app/services/github.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-repo-table',
  templateUrl: './repo-table.component.html',
  styleUrls: ['./repo-table.component.css'],
})
export class RepoTableComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'stargazers_count',
    'watchers',
    'created_at',
    'updated_at',
  ];
  dataSource: MatTableDataSource<Repo>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  repositories: Repo[] = [];

  loading = false;

  constructor(
    private githubService: GithubService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.dataSource = new MatTableDataSource(this.repositories);
  }
  ngOnInit(): void {
    this.loading = true;
  }

  setRepo(repos: Repo[]) {
    this.repositories = [...repos];
    this.dataSource = new MatTableDataSource(this.repositories);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;
  }

  sortData(sort: Sort) {
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
          return this.compare(
            a.description.charAt(0),
            b.description.charAt(0),
            isAsc
          );
        case 'stars':
          return this.compare(a.stargazers_count, b.stargazers_count, isAsc);
        case 'watchers':
          return this.compare(a.watchers, b.watchers, isAsc);
        case 'created':
          return this.compare(
            new Date(a.created_at).getTime(),
            new Date(b.created_at).getTime(),
            isAsc
          );
        case 'updated':
          return this.compare(
            new Date(a.updated_at).getTime(),
            new Date(b.updated_at).getTime(),
            isAsc
          );
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
