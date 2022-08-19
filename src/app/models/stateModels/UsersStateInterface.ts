import { DynamicFlatNode } from '../DynamicFlatNode';

export interface UsersStateInterface {
  isLoading: boolean;
  error: string;
  users: DynamicFlatNode[];
}
