import { createReducer, on } from '@ngrx/store';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { User } from 'src/app/models/User';
import { UsersStateInterface } from 'src/app/models/stateModels/UsersStateInterface';

import {
  addFullUserSuccess,
  addFullUserFailed,
  retrieveFullUser,
} from './usersList.actions';
import { FullUserStateInterface } from 'src/app/models/stateModels/FullUserStateInterface';

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
