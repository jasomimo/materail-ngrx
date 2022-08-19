import { DynamicFlatNode } from '../models/DynamicFlatNode';
import { User } from '../models/User';
import { UsersStateInterface } from '../models/stateModels/UsersStateInterface';

export interface AppState {
  users: ReadonlyArray<UsersStateInterface>;
  user: Readonly<User>;
}
