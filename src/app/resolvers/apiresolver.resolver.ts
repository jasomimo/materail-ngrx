import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, map, concatMap, EMPTY } from 'rxjs';
import { User } from '../models/User';
import { GithubService } from '../services/github.service';
import { addFullUser } from '../store/users/user.actions';
import { selectFullUser } from '../store/users/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class ApiResolver implements Resolve<User | boolean> {
  constructor(private githubService: GithubService, private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User | boolean> {
    return this.getUserApi(route);
  }
  getUserApi(route: ActivatedRouteSnapshot): Observable<User | boolean> {
    return this.githubService.getFullUser(route.params['login']).pipe(
      map((user) => {
        this.store.dispatch(addFullUser({ user: user }));
        return user;
      }),
      catchError((error) => {
        return of(false);
      })
    );
  }
}
