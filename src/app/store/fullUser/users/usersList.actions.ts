import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/User';

export const retrieveFullUser = createAction(
  '[Full user] Retrieve full user list',
  props<{ login: string }>()
);

export const addFullUserSuccess = createAction(
  '[Full user] User was added to list',
  props<{ user: User }>()
);

export const addFullUserFailed = createAction(
  '[Full user] Set user failed',
  props<{ error: string }>()
);
