import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoggedUserStateInterface } from 'src/app/models/stateModels/LoggedUserStateInterface';

export const selectLoggedUser =
  createFeatureSelector<LoggedUserStateInterface>('loggedUser');

export const loggedUserIsLoadingSelector = createSelector(
  selectLoggedUser,
  (state) => state.isLoading
);

export const loggedUsersSelector = createSelector(
  selectLoggedUser,
  (state) => state
);

export const loggedUsererrorSelector = createSelector(
  selectLoggedUser,
  (state) => state.error
);
