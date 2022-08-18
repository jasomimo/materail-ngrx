import { createReducer, on } from '@ngrx/store';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { User } from 'src/app/models/User';

import {
  addNewUsers,
  retrieveUsers,
  addFullUser,
  retrieveFullUserList,
  updateUserInList,
  updateAllList,
  setLoggedUser,
  retrieveLoggedUser,
} from './user.actions';

export const usersList: ReadonlyArray<DynamicFlatNode> = [];
export const fullUserDetails: ReadonlyArray<User> = [];
export const loggedUser: Readonly<User> = {
  login: '',
  name: '',
  avatar_url: '',
  followers: 0,
  public_repos: 0,
  id: -1,
};

// users list tree
export const usersReducer = createReducer(
  usersList,
  on(retrieveUsers, (state, { users }) => users),

  on(addNewUsers, (state, { users }) => {
    return [...state, users];
  }),
  on(updateUserInList, (state, { user }) => {
    let users = [...state];
    const arrayIndex = users.findIndex(
      (oneUser) => oneUser.user?.id === user.user?.id
    );
    users[arrayIndex] = user;
    return [...users];
  }),
  on(updateAllList, (state, { user }) => {
    return [...user];
  })
);

//users full details
export const oneUserReducer = createReducer(
  fullUserDetails,
  on(retrieveFullUserList, (state) => state),

  on(addFullUser, (state, { user }) => {
    return [...state, user];
  })
);

//logged user
export const loginReducer = createReducer(
  loggedUser,
  on(retrieveLoggedUser, (state) => state),
  on(setLoggedUser, (state, { user }) => {
    return { ...user };
  })
);
