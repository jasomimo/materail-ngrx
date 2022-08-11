import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';



export const selectUsers = createFeatureSelector<any>('users');
export const selectOneUser = createFeatureSelector<any>('user');
