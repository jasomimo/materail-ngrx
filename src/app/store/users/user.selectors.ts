import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { User } from 'src/app/models/User';

export const selectUsers = createFeatureSelector<DynamicFlatNode[]>('users');
export const selectOneUser = createFeatureSelector<any>('user');
export const selectLoggedUser = createFeatureSelector<User>('loggedUser');
