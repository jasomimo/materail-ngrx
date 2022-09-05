import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('when created, than should be initialized', () => {
    expect(component).toBeTruthy();
  });

  it('when add 1 repos, than lenght should be 1', () => {
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
});
