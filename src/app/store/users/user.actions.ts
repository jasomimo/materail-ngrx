import { createAction, props } from '@ngrx/store';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { User } from 'src/app/models/User';

//List
export const addNewUsers = createAction(
  '[User List] Add new users',
  props<{ users: DynamicFlatNode }>()
);

export const retrieveUsers = createAction(
  '[User list] Retrieve users',
  props<{ users: ReadonlyArray<DynamicFlatNode> }>()
);

export const updateUserInList = createAction(
  '[User list] Update user',
  props<{ user: DynamicFlatNode }>()
);

export const updateAllList = createAction(
  '[User list] Update full list',
  props<{ user: DynamicFlatNode[] }>()
);

//Detail
export const retrieveFullUserList = createAction(
  '[Full user] Retrieve full user list',
  props<{ users: Readonly<User> }>()
);

export const addFullUser = createAction(
  '[Full user] Set user',
  props<{ user: User }>()
);

//logged user
export const retrieveLoggedUser = createAction('[One user] Retrieve user');

export const setLoggedUser = createAction(
  '[One user] Set user',
  props<{ user: User }>()
);
