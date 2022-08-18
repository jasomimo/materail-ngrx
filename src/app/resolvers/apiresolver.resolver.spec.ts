import { TestBed } from '@angular/core/testing';

import { ApiresolverResolver } from './apiresolver.resolver';

describe('ApiresolverResolver', () => {
  let resolver: ApiresolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ApiresolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
