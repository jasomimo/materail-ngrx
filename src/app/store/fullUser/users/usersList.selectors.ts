import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { User } from 'src/app/models/User';
import { UsersStateInterface } from 'src/app/models/stateModels/UsersStateInterface';
import { FullUserStateInterface } from 'src/app/models/stateModels/FullUserStateInterface';

export const selectFullUser =
  createFeatureSelector<FullUserStateInterface>('fullUser');

export const isLoadingSelector = createSelector(
  selectFullUser,
  (state) => state.isLoading
);

export const fullUsersSelector = createSelector(
  selectFullUser,
  (state) => state.users
);

export const getUserSelector = (login: string) =>
  createSelector(selectFullUser, (state: FullUserStateInterface) => {
    return state.users.find((oneUser) => oneUser.login === login);
  });

export const errorSelector = createSelector(
  selectFullUser,
  (state) => state.error
);
