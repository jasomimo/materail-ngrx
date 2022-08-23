import { createAction, props } from '@ngrx/store';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';

export const addNewUsersSuccess = createAction(
  '[Full user] Add new userssuccess',
  props<{ users: DynamicFlatNode[] }>()
);

export const addNewUsersError = createAction(
  '[User List] Add new users fail',
  props<{ error: string }>()
);

export const retrieveUsers = createAction(
  '[User list] Retrieve users',
  props<{ fromUserId: number; authToken?: string }>()
);

export const updateUserInList = createAction(
  '[User list] Update user',
  props<{ user: DynamicFlatNode }>()
);

export const updateAllList = createAction(
  '[User list] Update full list',
  props<{ user: DynamicFlatNode[] }>()
);
