import { createReducer, on } from '@ngrx/store';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { User } from 'src/app/models/User';

import {
  addNewUsers,
  retrieveUsers,
  setFullUser,
  retrieveFullUser,
  updateUserInList,
  updateAllList,
  setLoggedUser,
  retrieveLoggedUser,
} from './user.actions';

export const usersList: ReadonlyArray<DynamicFlatNode> = [];
export const userDetail: Readonly<User> = {
  login: '',
  name: '',
  avatar_url: '',
  followers: 0,
  public_repos: 0,
  id: -1,
};
export const loggedUser: User = {
  login: '',
  name: '',
  avatar_url: '',
  followers: 0,
  public_repos: 0,
  id: -1,
};

export const usersReducer = createReducer(
  usersList,
  on(retrieveUsers, (state, { users }) => users),

  on(addNewUsers, (state, { users }) => {
    return [...state, users];
  }),
  on(updateUserInList, (state, { user }) => {
    let users = [...state];
    const arrayIndex = users.findIndex((oneUser) => oneUser.id === user.id);
    users[arrayIndex] = user;
    return [...users];
  }),
  on(updateAllList, (state, { user }) => {
    return [...user];
  })
);
export const oneUserReducer = createReducer(
  userDetail,
  on(retrieveFullUser, (state, { user }) => state),

  on(setFullUser, (state, { user }) => {
    return { ...user };
  })
);

export const loginReducer = createReducer(
  loggedUser,
  on(retrieveLoggedUser, (state) => state),
  on(setLoggedUser, (state, { user }) => {
    return { ...user };
  })
);
