import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { GithubService } from 'src/app/services/github.service';

import {
  addFullUserFailed,
  addFullUserSuccess,
  retrieveFullUser,
} from './usersList.actions';

@Injectable()
export class UserListEffect {
  constructor(
    private actions$: Actions,
    private githubService: GithubService
  ) {}

  getFullUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveFullUser),
      mergeMap((action) => {
        return this.githubService.getFullUser(action.login).pipe(
          map((user) => addFullUserSuccess({ user: user })),
          catchError((error) => of(addFullUserFailed({ error: error.message })))
        );
      })
    )
  );
}
