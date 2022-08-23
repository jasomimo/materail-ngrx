import { User } from '../User';

export interface LoggedUserStateInterface {
  isLoading: boolean;
  error: string;
  user: User;
}
