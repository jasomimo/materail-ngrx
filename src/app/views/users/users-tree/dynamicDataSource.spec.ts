import {
  CollectionViewer,
  ListRange,
  SelectionChange,
  SelectionModel,
} from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { DynamicFlatNode } from 'src/app/models/DynamicFlatNode';
import { Repo } from 'src/app/models/Repo';
import { GithubService } from 'src/app/services/github.service';
import { DynamicDataSource } from './dynamicDataSource';

describe('DynamicDataSource', () => {
  let service: DynamicDataSource;

  const mockSelectionChange: SelectionChange<DynamicFlatNode> = {
    added: [],
    removed: [],
    source: {} as SelectionModel<DynamicFlatNode>,
  };

  let mockChangedSubjec: Subject<SelectionChange<DynamicFlatNode>> =
    new BehaviorSubject<SelectionChange<DynamicFlatNode>>(mockSelectionChange);

  const mockExpansionModelObj = jasmine.createSpyObj<
    SelectionModel<DynamicFlatNode>
  >('', [], {
    changed: mockChangedSubjec,
  });

  const mockFlatTreeContorlObj = jasmine.createSpyObj<
    FlatTreeControl<DynamicFlatNode>
  >('', [], {
    expansionModel: mockExpansionModelObj,
  });

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
      repos_url: 'myTestingUrlk',
    },
  };

  beforeEach(async () => {
    let repo: Repo = {
      created_at: '2022',
      description: 'adesc',
      id: 1,
      name: 'myRepo',
      stargazers_count: 14,
      updated_at: '2023',
      watchers: 25,
    };
    let repo2: Repo = {
      created_at: '2022',
      description: 'bdesc',
      id: 1,
      name: 'myRepo',
      stargazers_count: 14,
      updated_at: '2023',
      watchers: 25,
    };

    const obsReturn: Repo[] = [repo, repo2];
    const githubServiceSpy = jasmine.createSpyObj<GithubService>('myNAme', {
      getRepsitoriesOfUser: of(obsReturn),
    });

    await TestBed.configureTestingModule({
      providers: [
        { provide: FlatTreeControl, useValue: mockFlatTreeContorlObj },
        { provide: GithubService, useValue: githubServiceSpy },
      ],
    }).compileComponents();
    service = TestBed.inject(DynamicDataSource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('when connect, than handle tree control should be called', () => {
    const colc: CollectionViewer = {
      viewChange: of({} as ListRange),
    };

    service.handleTreeControl = jasmine.createSpy();

    service.connect(colc);

    expect(service.handleTreeControl).toHaveBeenCalledWith(mockSelectionChange);
  });

  it('when handleTree, than removed', () => {
    const dynamicArray = [dynamicFlatNode2, dynamicFlatNode2];

    const selectionModel = jasmine.createSpyObj('someObject', [
      'method1',
      'method2',
    ]);

    const change: SelectionChange<DynamicFlatNode> = {
      added: dynamicArray,
      removed: dynamicArray,
      source: selectionModel,
    };
    spyOn(service, 'toggleNode');
    service.handleTreeControl(change);
    expect(service.toggleNode).toHaveBeenCalled();
  });

  it('when toggleNode expanded false, than change datachange ', () => {
    const dynamicArray = [dynamicFlatNode2, dynamicFlatNode2];
    service.data = dynamicArray;
    service.toggleNode(dynamicFlatNode2, false);
    service.dataChange.subscribe((data) => {
      //2 users
      expect(data.length).toBe(2);
    });
  });
  it('when toggleNode expanded false, than change datachange ', () => {
    const dynamicArray = [dynamicFlatNode2, dynamicFlatNode2];

    const github = TestBed.inject(GithubService);
    service.data = dynamicArray;
    service.toggleNode(dynamicFlatNode2, true);
    service.dataChange.subscribe((data) => {
      //2 users and 2 repos
      expect(data.length).toBe(4);
    });
  });
  it('when toggleNode expanded false, than change datachange ', () => {
    const dynamicArray = [dynamicFlatNode2, dynamicFlatNode2];

    const github = TestBed.inject(GithubService);
    service.toggleNode(dynamicFlatNode2, true);
    service.dataChange.subscribe((data) => {
      //0 users 0 repos
      expect(data.length).toBe(0);
    });
  });
  it('when toggleNode expanded false, than change datachange ', () => {
    const colc: CollectionViewer = {
      viewChange: of({} as ListRange),
    };
    service.disconnect(colc);
  });
});
