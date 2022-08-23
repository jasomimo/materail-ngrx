import { createReducer, on } from '@ngrx/store';
import { UsersStateInterface } from 'src/app/models/stateModels/UsersStateInterface';
import { User } from 'src/app/models/User';

import {
  addNewUsersError,
  addNewUsersSuccess,
  retrieveUsers,
} from './user.actions';

export const usersList: Readonly<UsersStateInterface> = {
  isLoading: false,
  error: '',
  users: [],
};
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
  on(retrieveUsers, (state) => ({ ...state, isLoading: true })),

  on(addNewUsersSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    users: state.users.concat(action.users),
  })),

  on(addNewUsersError, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
