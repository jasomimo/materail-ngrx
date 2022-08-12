import { Injectable } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { loginUserSuccess, loadLoginError, loadLogin } from './user.actions';

@Injectable()
export class UserEffect {
  // loginUser$ = createEffect(() =>
  // this.actions$.pipe(
  //   ofType(loadLogin),
  //   mergeMap(() => this.githubService.login().pipe(
  //     map(() => loginUserSuccess),
  //     catchError(() => EMPTY)
  //   )
  // ))
  // );

  constructor(
    private actions$: Actions, // this is an RxJS stream of all actions
    private githubService: GithubService
  ) {}
}
