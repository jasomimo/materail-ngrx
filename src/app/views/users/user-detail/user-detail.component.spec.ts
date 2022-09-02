import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubService } from 'src/app/services/github.service';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Repo } from 'src/app/models/Repo';
import { RepoTableComponent } from './repo-table/repo-table.component';
import { UserDetailComponent } from './user-detail.component';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let tablecomp;
  let tablecompSpy: RepoTableComponent;
  const repo: Repo = {
    created_at: '11/11/2019',
    description: 'desc',
    id: 147,
    name: 'myTestRepo',
    stargazers_count: 125,
    updated_at: '12/12/2020',
    watchers: 4,
  };
  const repos: Repo[] = [repo];

  const githubServiceSpy = jasmine.createSpyObj<GithubService>('myNAme', {
    getRepsitoriesOfUser: of(repos),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: GithubService, useValue: githubServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('when destroy, than subscription should be close', async () => {
    component.user = {
      id: -1,
      avatar_url: '',
      followers: 1,
      login: 'nonameansdasdsad',
      name: 'Wou',
      public_repos: 25,
    };
    component.ngOnDestroy();
    expect(component.user$.closed).toBe(true);
  });
  it('when getRepos withour repos, if should be skipped', async () => {
    component.user = {
      login: 'TestUser',
      followers: 1,
      avatar_url: 'https://avatars.githubusercontent.com/u/9919?s=40&v=4',
      id: 2,
      name: 'test user',
      public_repos: -1,
    };
    component.getUserRepos();
  });

  it('when getRepos, setRepo should be called', async () => {
    component.user = {
      login: 'TestUser',
      followers: 1,
      avatar_url: 'https://avatars.githubusercontent.com/u/9919?s=40&v=4',
      id: 2,
      name: 'test user',
      public_repos: -1,
      repos_url: 'httos://testingReposUrl',
    };
  });
});
