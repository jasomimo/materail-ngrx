import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { User } from 'src/app/models/User';
import { GithubService } from 'src/app/services/github.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import {
  addNewUsersError,
  addNewUsersSuccess,
  retrieveUsers,
} from '../users/user.actions';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private githubService: GithubService,
    private snackBarService: SnackBarService
  ) {}

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveUsers),
      mergeMap((action) => {
        return this.githubService.getUsers(action.fromUserId).pipe(
          map((users) =>
            addNewUsersSuccess({ users: this.mapUsersToDynamicNode(users) })
          ),
          catchError((error) => {
            this.snackBarService.openSnackBar(error.error.message, 'Ok');
            return of(addNewUsersError({ error: error }));
          })
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
