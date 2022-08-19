import { Injectable } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';

import {
  addFullUserSuccess,
  retrieveFullUser,
  addFullUserFailed,
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
