import { Injectable } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import {
  retrieveUsers,
  addNewUsersError,
  addNewUsersSuccess,
} from '../users/user.actions';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { User } from 'src/app/models/User';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private githubService: GithubService
  ) {}

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveUsers),
      mergeMap((action) => {
        return this.githubService.getUsers(action.fromUserId).pipe(
          map((users) =>
            addNewUsersSuccess({ users: this.mapUsersToDynamicNode(users) })
          ),
          catchError((error) => of(addNewUsersError({ error: error.message })))
        );
      })
    )
  );
  mapUsersToDynamicNode(allUsers: User[]) {
    const myselect: DynamicFlatNode[] = allUsers.map((p: User) => {
      return {
        level: 1,
        expandable: true,
        isLoading: false,
        user: p,
      };
    });
    return myselect;
  }
}
