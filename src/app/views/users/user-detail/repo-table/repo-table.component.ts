import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Repo } from 'src/app/models/Repo';

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

  constructor(private _liveAnnouncer: LiveAnnouncer) {
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
