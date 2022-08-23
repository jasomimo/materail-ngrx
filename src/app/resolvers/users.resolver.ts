import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../models/User';
import { GithubService } from '../services/github.service';
import { addFullUserSuccess } from '../store/fullUser/users/usersList.actions';
import { getUserSelector } from '../store/fullUser/users/usersList.selectors';

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
    return this.store.select(getUserSelector(route.params['login'])).pipe(
      map((myUser) => {
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
        this.store.dispatch(addFullUserSuccess({ user: user }));
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
