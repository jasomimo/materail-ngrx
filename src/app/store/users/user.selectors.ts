import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersStateInterface } from 'src/app/models/stateModels/UsersStateInterface';

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
