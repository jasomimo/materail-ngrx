import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { routes } from 'src/app/app-routing.module';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { FullUserStateInterface } from 'src/app/models/stateModels/FullUserStateInterface';
import { GithubService } from 'src/app/services/github.service';
import { selectFullUser } from 'src/app/store/fullUser/users/usersList.selectors';
import { loggedUsersSelector } from 'src/app/store/loggedUser/users/loggedUser.selectors';
import { usersSelector } from 'src/app/store/users/user.selectors';

import { UsersTreeComponent } from './users-tree.component';

describe('UsersTreeComponent', () => {
  let component: UsersTreeComponent;
  let fixture: ComponentFixture<UsersTreeComponent>;
  let store: MockStore;

  let dynamicFlatNode: DynamicFlatNode = {
    expandable: false,
    isLoading: false,
    level: 1,
    user: {
      avatar_url: '',
      id: 1,
      followers: 150,
      login: 'mojombo',
      name: 'Lukas',
      public_repos: 20,
    },
  };
  let dynamicFlatNode2: DynamicFlatNode = {
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
    },
  };

  beforeEach(async () => {
    const githubServiceSpy = jasmine.createSpyObj<GithubService>('myNAme', [
      'getUsers',
      'login',
      'getRepsitoriesOfUser',
      'getFullUser',
    ]);

    await TestBed.configureTestingModule({
      declarations: [UsersTreeComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: GithubService, useValue: githubServiceSpy },
        provideMockStore({ initialState: [] }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    const user: DynamicFlatNode = {
      expandable: false,
      isLoading: false,
      level: 1,
      user: {
        login: 'TestUser',
        followers: 1,
        avatar_url: 'https://avatars.githubusercontent.com/u/9919?s=40&v=4',
        id: 2,
        name: 'test user',
        public_repos: -1,
      },
    };
    store = TestBed.inject(MockStore);

    const myUser = {
      login: 'TestUser',
      followers: 1,
      avatar_url: 'https://avatars.githubusercontent.com/u/9919?s=40&v=4',
      id: 2,
      name: 'test user',
      public_repos: -1,
    };

    const fullUsers: FullUserStateInterface = {
      isLoading: false,
      error: '',
      users: [myUser],
    };

    store.overrideSelector(usersSelector, [user]);
    store.overrideSelector(selectFullUser, fullUsers);

    fixture = TestBed.createComponent(UsersTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be unknown user', () => {
    store.overrideSelector(loggedUsersSelector, {
      error: '',
      isLoading: false,
      user: {
        login: 'TestUser',
        followers: 1,
        avatar_url: 'https://avatars.githubusercontent.com/u/9919?s=40&v=4',
        id: 2,
        name: 'test user',
        public_repos: -1,
      },
    });
    component.loadLoggedUser();
    expect(component.loggedUser.id).toEqual(2);
  });
  it('should be expandable', () => {
    const dynamicFlatNode: DynamicFlatNode = {
      expandable: false,
      isLoading: false,
      level: 1,
    };

    expect(component.isExpandable(dynamicFlatNode)).toBe(false);
    expect(component.getLevel(dynamicFlatNode)).toBe(1);
    expect(component.hasChild(1, dynamicFlatNode)).toBe(false);
  });
  it('should download user data ', () => {
    component.selectedNode = dynamicFlatNode;
    component.handleChange(dynamicFlatNode2);
    expect(component.selectedUser?.id).toBe(undefined);
  });
  it('when same node as clicked, than selected user should be null', () => {
    component.selectedNode = JSON.parse(JSON.stringify(dynamicFlatNode2));
    component.handleChange(dynamicFlatNode2);
    expect(component.selectedUser).toBe(null);
  });
  it('find biggest id', () => {
    component.dataSource.data = [dynamicFlatNode, dynamicFlatNode2];
    const biggestId = component.findMaxId();
    expect(biggestId).toEqual(24);
  });

  it('when loadMoreUsers, than dispatch', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough(); // spy on the store
    component.loadMoreUsers();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  it('find biggest id in empty array', () => {
    let mydynamicFlatNode = dynamicFlatNode;
    mydynamicFlatNode.user = undefined;
    component.dataSource.data = [mydynamicFlatNode];
    const biggestId = component.findMaxId();
    expect(biggestId).toEqual(0);
  });
});
