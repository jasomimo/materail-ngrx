import { createAction, props } from '@ngrx/store';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { User } from 'src/app/models/User';
import { UsersStateInterface } from 'src/app/models/stateModels/UsersStateInterface';

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
