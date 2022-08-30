import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Repo } from 'src/app/models/Repo';

import { RepoTableComponent } from './repo-table.component';

describe('RepoTableComponent', () => {
  let component: RepoTableComponent;
  let fixture: ComponentFixture<RepoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepoTableComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has repo', () => {
    let repo: Repo = {
      created_at: '2022',
      description: 'desc',
      id: 1,
      name: 'myRepo',
      stargazers_count: 14,
      updated_at: '2023',
      watchers: 25,
    };
    const repos: Repo[] = [repo];
    component.setRepo(repos);
    expect(component.repositories.length).toBe(1);
  });
  it('when sort that data should be sorted', () => {
    let repo: Repo = {
      created_at: '2022',
      description: 'adesc',
      id: 1,
      name: 'myRepo',
      stargazers_count: 14,
      updated_at: '2023',
      watchers: 25,
    };
    let repo2: Repo = {
      created_at: '2022',
      description: 'bdesc',
      id: 1,
      name: 'myRepo',
      stargazers_count: 14,
      updated_at: '2023',
      watchers: 25,
    };
    const repos: Repo[] = [repo, repo2];
    component.setRepo(repos);
    let sort: Sort = {
      active: 'description',
      direction: 'asc',
    };
    const table = document.getElementById('repoTable');

    console.log('tabulkaris', table);
    component.announceSortChange(sort);
    sort.direction = '';
    component.announceSortChange(sort);
    // expect(component.repositories.length).toBe(1);
  });
});
