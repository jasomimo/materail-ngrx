import {
  usersSelector,
  errorSelector,
  isLoadingSelector,
} from './user.selectors';
import { UsersStateInterface } from 'src/app/models/stateModels/UsersStateInterface';
import { User } from 'src/app/models/User';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';

describe('user selectors', () => {
  let testingNode: DynamicFlatNode = {
    expandable: false,
    isLoading: false,
    level: 1,
    user: {
      avatar_url: '',
      id: 24,
      followers: 150,
      login: 'mojombo',
      name: 'Lukas',
      public_repos: 20,
      repos_url: 'myTestingUrlk',
    },
  };
  let initialState: UsersStateInterface = {
    error: 'Error',
    isLoading: false,
    users: [testingNode],
  };

  it('when usersSelector, than should return users list ', () => {
    const result = usersSelector.projector(initialState);
    expect(result.length).toEqual(1);
    expect(result[0].user?.id).toEqual(24);
  });

  it('when error message, than should return message', () => {
    const result = errorSelector.projector(initialState);
    expect(result).toEqual('Error');
  });
});
