import { createReducer, on } from '@ngrx/store';

import { LoggedUserStateInterface } from 'src/app/models/stateModels/LoggedUserStateInterface';
import {
  retrieveLoggedUser,
  setLoggedUserFailed,
  setLoggedUserSuccess,
} from './loggedUser.actions';

export const loggedUser: Readonly<LoggedUserStateInterface> = {
  isLoading: false,
  error: '',
  user: {
    login: 'Unknown',
    followers: -1,
    avatar_url: 'https://avatars.githubusercontent.com/u/9919?s=40&v=4',
    id: -1,
    name: 'Unknown user',
    public_repos: -1,
  },
};

//logged user
export const loginReducer = createReducer(
  loggedUser,
  on(retrieveLoggedUser, (state) => ({ ...state, isLoading: true })),
  on(setLoggedUserSuccess, (state, { user }) => {
    return {
      error: '',
      isLoading: false,
      user: user,
    };
  }),
  on(setLoggedUserFailed, (state, { error }) => {
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  })
);
