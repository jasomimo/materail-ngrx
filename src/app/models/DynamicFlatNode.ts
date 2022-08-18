import { Repo } from './Repo';
import { User } from './User';

export class DynamicFlatNode {
  constructor(
    public level: number = 1,
    public expandable: boolean = false,
    public isLoading: boolean = false,
    public user?: User,
    public repos?: Repo
  ) {}
}
