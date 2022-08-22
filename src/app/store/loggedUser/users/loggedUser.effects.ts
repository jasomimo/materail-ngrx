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
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class LoggedUserEffect {
  constructor(
    private actions$: Actions,
    private githubService: GithubService,
    private _snackBar: MatSnackBar
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
            this.openSnackBar(error.error.message, 'Ok');
            return of(setLoggedUserFailed({ error: error.error.message }));
          })
        );
      })
    )
  );
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 6000,
    });
  }
}
