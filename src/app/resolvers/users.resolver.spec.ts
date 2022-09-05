import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppModule } from '../app.module';
import { FullUserStateInterface } from '../models/stateModels/FullUserStateInterface';
import { User } from '../models/User';
import { GithubService } from '../services/github.service';
import { selectFullUser } from '../store/fullUser/users/usersList.selectors';

import { UsersResolver } from './users.resolver';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let route: ActivatedRouteSnapshot;
  let mockSnapshot: any;
  let store: MockStore;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    const expectedUser: User = {
      login: 'LukaSK351',
      followers: 1,
      avatar_url: 'https://avatars.githubusercontent.com/u/9919?s=40&v=4',
      id: 2,
      name: 'test user',
      public_repos: -1,
    };

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const githubServiceSpy = jasmine.createSpyObj<GithubService>('myNAme', {
      getFullUser: of(expectedUser),
    });
    route = jasmine.createSpyObj<ActivatedRouteSnapshot>('myNames', [], {
      params: ['login'],
    });

    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: GithubService, useValue: githubServiceSpy },
        { provide: RouterStateSnapshot, useValue: mockSnapshot },
        provideMockStore({ initialState: [] }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    const myUser = {
      login: 'TestUser',
      followers: 1,
      avatar_url: 'https://avatars.githubusercontent.com/u/9919?s=40&v=4',
      id: 2,
      name: 'test user',
      public_repos: -1,
    };

    const fullUsers: FullUserStateInterface = {
      isLoading: false,
      error: '',
      users: [myUser],
    };
    store.overrideSelector(selectFullUser, fullUsers);
    resolver = TestBed.inject(UsersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
  it('should be created', () => {
    spyOn(resolver, 'getUserApi');
    resolver.resolve(route, mockSnapshot);
    expect(resolver.getUserApi).toHaveBeenCalled();
  });
  it('should be created', () => {
    resolver.getUserStore(route).subscribe((res) => {
      expect(res).toBe(false);
    });
  });
  it('should be created', () => {
    resolver.getUserApi(route).subscribe((res) => {
      const user: User = res as User;
      expect(user.login).toBe('LukaSK351');
    });
  });
});
