import { TestBed } from '@angular/core/testing';

import {
  ActivatedRouteSnapshot,
  Data,
  DetachedRouteHandle,
} from '@angular/router';
import { CustomRouteReuseStrategy } from './custom-route-reuse.strategy';

describe('LoginComponent', () => {
  let strategy: CustomRouteReuseStrategy;

  let mockExpansionModelObj: jasmine.SpyObj<ActivatedRouteSnapshot>;
  let mockDetached: jasmine.SpyObj<DetachedRouteHandle>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [CustomRouteReuseStrategy],
    });
    const myData: Data = {
      key: 'list_comp',
      reuseComponent: true,
    };
    const routeConfig = {
      path: 'testPath',
    };
    mockExpansionModelObj = jasmine.createSpyObj<ActivatedRouteSnapshot>(
      'myNames',
      [],
      {
        routeConfig: routeConfig,
        data: myData,
      }
    );
    mockDetached = jasmine.createSpyObj<DetachedRouteHandle>(
      'myNamesas',
      ['method'],
      {
        routeConfig: routeConfig,
        data: myData,
      }
    );
    strategy = TestBed.inject(CustomRouteReuseStrategy);
  });

  it('when detached with data and routeConfig than return true', () => {
    expect(strategy.shouldDetach(mockExpansionModelObj)).toBe(true);
  });
  it('when detached without routeConfig, return false', () => {
    const mockExpansionModelObjWitoutConf =
      jasmine.createSpyObj<ActivatedRouteSnapshot>('myNames', [], {
        data: {},
      });
    expect(strategy.shouldDetach(mockExpansionModelObjWitoutConf)).toBe(false);
  });

  it('when should attach without data than return false', () => {
    const mockExpansionModelObjWitoutConf =
      jasmine.createSpyObj<ActivatedRouteSnapshot>('myNames', [], {
        data: {},
      });
    expect(strategy.shouldAttach(mockExpansionModelObjWitoutConf)).toBe(false);
  });

  it('when should attach with data and routeConfig than return true', () => {
    strategy.store(mockExpansionModelObj, mockDetached);
    expect(strategy.shouldAttach(mockExpansionModelObj)).toBe(true);
  });

  it('when retrieve with data than return not null', () => {
    strategy.store(mockExpansionModelObj, mockDetached);
    expect(strategy.retrieve(mockExpansionModelObj)).toEqual(
      jasmine.anything()
    );
  });
  it('when retrieve without data than return null', () => {
    const mockExpansionModelObjWitoutConf =
      jasmine.createSpyObj<ActivatedRouteSnapshot>('myNames', [], {
        data: {},
      });
    expect(strategy.retrieve(mockExpansionModelObjWitoutConf)).toEqual(null);
  });
  it('when shouldReuseRoute with data than return true', () => {
    const mockExpansionModelObjWitoutConf =
      jasmine.createSpyObj<ActivatedRouteSnapshot>('myNames', [], {
        data: {},
      });
    expect(
      strategy.shouldReuseRoute(
        mockExpansionModelObjWitoutConf,
        mockExpansionModelObjWitoutConf
      )
    ).toEqual(true);
  });
  it('when clear with data and routeConfig than return true', () => {
    strategy.clear();
  });
});
