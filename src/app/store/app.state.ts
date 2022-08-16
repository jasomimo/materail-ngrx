import { DynamicFlatNode } from "../models/DynamicFlatNode";
import { User } from "../models/User";

export interface AppState {
  users: ReadonlyArray<DynamicFlatNode>;
  user: Readonly<User>;
}
