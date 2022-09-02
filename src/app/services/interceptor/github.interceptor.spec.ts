import { HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppModule } from 'src/app/app.module';

import { GithubInterceptor } from './github.interceptor';

describe('GithubInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [GithubInterceptor, provideMockStore({ initialState: [] })],
    })
  );

  it('should be created', () => {
    const interceptor: GithubInterceptor = TestBed.inject(GithubInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
