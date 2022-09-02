import { FullUserStateInterface } from 'src/app/models/stateModels/FullUserStateInterface';
import { User } from 'src/app/models/User';
import {
  errorSelector,
  fullUsersSelector,
  isLoadingSelector,
} from './usersList.selectors';

describe('userlist selector', () => {
  let testingUser: User = {
    avatar_url: '',
    id: 24,
    followers: 150,
    login: 'mojombo',
    name: 'Lukas',
    public_repos: 20,
    repos_url: 'myTestingUrlk',
  };
  let initialState: FullUserStateInterface = {
    error: 'Error',
    isLoading: true,
    users: [testingUser],
  };

  it('when  loading than should return true ', () => {
    const result = isLoadingSelector.projector(initialState);
    expect(result).toEqual(true);
  });

  it('when error message, than should return message ', () => {
    const result = errorSelector.projector(initialState);
    expect(result).toEqual('Error');
  });
  it('when user list, than should return array of users ', () => {
    const result = fullUsersSelector.projector(initialState);
    expect(result.length).toEqual(1);
  });
});
