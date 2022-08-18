import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, map, switchMap } from 'rxjs';
import { User } from '../models/User';
import { GithubService } from '../services/github.service';
import { addFullUser } from '../store/users/user.actions';
import { selectFullUser } from '../store/users/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<User | boolean> {
  constructor(private githubService: GithubService, private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User | boolean> {
    const userFromApi = this.getValue(this.getUserStore(route));
    if (!userFromApi) {
      return this.getUserApi(route);
    } else {
      return of(userFromApi);
    }
  }
  getUserStore(route: ActivatedRouteSnapshot): Observable<User | boolean> {
    return this.store.select(selectFullUser).pipe(
      map((users) => {
        const myUser = users.find(
          (oneUser) => oneUser.login === route.params['login']
        );
        if (myUser) {
          return myUser;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        return of(false);
      })
    );
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
  getValue(obj: Observable<any>) {
    let value: any;
    obj.subscribe((v) => (value = v));
    return value;
  }
}
