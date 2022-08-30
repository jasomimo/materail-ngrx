import { Repo } from './Repo';
import { User } from './User';

export interface DynamicFlatNode {
  level: number;
  expandable: boolean;
  isLoading: boolean;
  user?: User;
  repos?: Repo;
}
