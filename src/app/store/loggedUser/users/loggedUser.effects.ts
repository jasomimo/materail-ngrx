import { Injectable } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  setLoggedUserFailed,
  setLoggedUserSuccess,
  retrieveLoggedUser,
} from './loggedUser.actions';

@Injectable()
export class LoggedUserEffect {
  constructor(
    private actions$: Actions,
    private githubService: GithubService
  ) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveLoggedUser),
      mergeMap((action) => {
        return this.githubService.login(action.loginToken).pipe(
          map((user) => setLoggedUserSuccess({ user: user })),
          catchError((error) =>
            of(setLoggedUserFailed({ error: error.error.message }))
          )
        );
      })
    )
  );
}
