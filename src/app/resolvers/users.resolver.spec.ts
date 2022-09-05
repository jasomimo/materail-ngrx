import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { AppModule } from '../app.module';
import { GithubService } from '../services/github.service';

import { UsersResolver } from './users.resolver';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let route: ActivatedRouteSnapshot;
  let test: RouterStateSnapshot;
  let mockSnapshot: any;
  beforeEach(async () => {
    const githubServiceSpy = jasmine.createSpyObj<GithubService>('myNAme', [
      'getUsers',
      'login',
      'getRepsitoriesOfUser',
      'getFullUser',
    ]);
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>(
      'RouterStateSnapshot',
      ['toString']
    );

    route = new ActivatedRouteSnapshot();
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: GithubService, useValue: githubServiceSpy },
        { provide: RouterStateSnapshot, useValue: mockSnapshot },
        {
          provide: ActivatedRoute,
          useClass: class {
            data = of({ user: 'Alice' });
          },
        },
        provideMockStore({ initialState: [] }),
      ],
    }).compileComponents();
    resolver = TestBed.inject(UsersResolver);
    route = new ActivatedRouteSnapshot();
    // route.params['login'] = 'Lukask';
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
  it('should be created', () => {
    // act
    // resolver.resolve(route, mockSnapshot).subscribe((resolved) => {});
  });
});
