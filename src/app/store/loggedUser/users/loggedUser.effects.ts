import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { GithubService } from 'src/app/services/github.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import {
  retrieveLoggedUser,
  setLoggedUserFailed,
  setLoggedUserSuccess,
} from './loggedUser.actions';

@Injectable()
export class LoggedUserEffect {
  constructor(
    private actions$: Actions,
    private githubService: GithubService,
    private snackBarService: SnackBarService
  ) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveLoggedUser),
      mergeMap((action) => {
        return this.githubService.login(action.loginToken).pipe(
          map((user) => {
            user.token = action.loginToken;
            return setLoggedUserSuccess({ user: user });
          }),
          catchError((error) => {
            this.snackBarService.openSnackBar(error.error.message, 'Ok');
            return of(setLoggedUserFailed({ error: error.error.message }));
          })
        );
      })
    )
  );
}
