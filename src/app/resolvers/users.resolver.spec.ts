import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppModule } from '../app.module';
import { GithubService } from '../services/github.service';

import { UsersResolver } from './users.resolver';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let route: ActivatedRouteSnapshot;

  beforeEach(async () => {
    // resolver = new UsersResolver(new GithubService(new HttpClient()));
    route = new ActivatedRouteSnapshot();
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
    resolver = TestBed.inject(UsersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
