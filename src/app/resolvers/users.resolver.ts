import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../models/User';
import { GithubService } from '../services/github.service';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<User | boolean> {
  constructor(private githubService: GithubService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User | boolean> {
    return this.githubService.getFullUser(route.params['login']).pipe(
      catchError((error) => {
        return of(false);
      })
    );
  }
}
