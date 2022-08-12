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


//Detail
export const retrieveFullUser = createAction(
  '[One user] Retrieve user',
  props<{ user: Readonly<User> }>()
);

export const setFullUser = createAction(
  '[One user] Set user',
  props<{ user: User }>()
);
