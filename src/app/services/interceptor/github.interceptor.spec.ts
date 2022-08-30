import { TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { GithubInterceptor } from './github.interceptor';

describe('GithubInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [GithubInterceptor],
      imports: [AppModule],
    })
  );

  it('should be created', () => {
    const interceptor: GithubInterceptor = TestBed.inject(GithubInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
