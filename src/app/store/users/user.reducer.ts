import { createReducer, on } from '@ngrx/store';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { User } from 'src/app/models/User';


import { addNewUsers, retrieveUsers, setFullUser, retrieveFullUser } from './user.actions';

export const usersList: ReadonlyArray<DynamicFlatNode> = [];
export const userDetail: Readonly<User>  = {
  login: ''
};

export const usersReducer = createReducer(
  usersList,
  on(retrieveUsers, (state, { users }) => users),

  on(addNewUsers, (state, { users }) => {
    return [...state, users];
  }),
);
export const oneUserReducer = createReducer(
  userDetail,
  on(retrieveFullUser, (state, {user}) => state),

  on(setFullUser, (state, { user }) => {
    return {...user};
  }),
);


