import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { User } from '../models/User';
import { of } from 'rxjs';

import { GithubService } from './github.service';
import { Repo } from '../models/Repo';

describe('GithubService', () => {
  let service: GithubService;
  let controller: HttpTestingController;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let githubService: GithubService;
  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    githubService = new GithubService(httpClientSpy);
  });

  it('when https get user, user should be download', (done: DoneFn) => {
    const expectedUser: User = {
      login: 'LukaSK351',
      followers: 1,
      avatar_url: 'https://avatars.githubusercontent.com/u/9919?s=40&v=4',
      id: 2,
      name: 'test user',
      public_repos: -1,
    };

    httpClientSpy.get.and.returnValue(of(expectedUser));

    githubService.getFullUser('LukaSK351').subscribe({
      next: (user) => {
        expect(user.login)
          .withContext('expected heroes')
          .toEqual(expectedUser.login);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('when https get user, user should be download', (done: DoneFn) => {
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

    httpClientSpy.get.and.returnValue(of(repos));

    githubService.getRepsitoriesOfUser('LukaSK351').subscribe({
      next: (repos) => {
        expect(repos[0].id)
          .withContext('expected repo with id 147')
          .toEqual(repo.id);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('when token, than user should be returned', (done: DoneFn) => {
    const expectedUser: User = {
      login: 'LukaSK351',
      followers: 1,
      avatar_url: 'https://avatars.githubusercontent.com/u/9919?s=40&v=4',
      id: 2,
      name: 'test user',
      public_repos: -1,
    };

    httpClientSpy.get.and.returnValue(of(expectedUser));

    githubService.login('LukaSK351').subscribe({
      next: (user) => {
        expect(user.id)
          .withContext('expected repo with id 147')
          .toEqual(expectedUser.id);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('when getUsers than list of users should be returned', (done: DoneFn) => {
    const expectedUser: User = {
      login: 'LukaSK351',
      followers: 1,
      avatar_url: 'https://avatars.githubusercontent.com/u/9919?s=40&v=4',
      id: 2,
      name: 'test user',
      public_repos: -1,
    };
    const expectedUsersArray: User[] = [expectedUser, expectedUser];

    httpClientSpy.get.and.returnValue(of(expectedUsersArray));

    githubService.getUsers(0).subscribe({
      next: (user) => {
        expect(user.length)
          .withContext('expected length of users')
          .toEqual(expectedUsersArray.length);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
