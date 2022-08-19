import { User } from '../User';

export interface FullUserStateInterface {
  isLoading: boolean;
  error: string;
  users: User[];
}
