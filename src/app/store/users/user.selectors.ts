import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { User } from 'src/app/models/User';
import { UsersStateInterface } from 'src/app/models/stateModels/UsersStateInterface';
import { AppState } from '../app.state';

export const selectUsers = createFeatureSelector<UsersStateInterface>('users');

export const isLoadingSelector = createSelector(
  selectUsers,
  (state) => state.isLoading
);

export const usersSelector = createSelector(
  selectUsers,
  (state) => state.users
);

export const errorSelector = createSelector(
  selectUsers,
  (state) => state.error
);
