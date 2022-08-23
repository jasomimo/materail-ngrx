import { createReducer, on } from '@ngrx/store';

import { FullUserStateInterface } from 'src/app/models/stateModels/FullUserStateInterface';
import {
  addFullUserFailed,
  addFullUserSuccess,
  retrieveFullUser,
} from './usersList.actions';

export const fullUserDetails: Readonly<FullUserStateInterface> = {
  isLoading: false,
  error: '',
  users: [],
};

//users full details
export const oneUserReducer = createReducer(
  fullUserDetails,
  on(retrieveFullUser, (state) => ({ ...state, isLoading: true })),

  on(addFullUserSuccess, (state, { user }) => ({
    ...state,
    isLoading: false,
    users: [...state.users, user],
  })),

  on(addFullUserFailed, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
