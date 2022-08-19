import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/User';

export const retrieveLoggedUser = createAction(
  '[One user] Retrieve logged  user',
  props<{ loginToken: string }>()
);

export const setLoggedUserSuccess = createAction(
  '[One user] Set logged user success',
  props<{ user: User }>()
);

export const setLoggedUserFailed = createAction(
  '[One user] Set logged  user failed',
  props<{ error: string }>()
);
