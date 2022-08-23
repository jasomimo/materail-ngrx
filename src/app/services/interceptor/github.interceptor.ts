import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoggedUserStateInterface } from 'src/app/models/stateModels/LoggedUserStateInterface';
import { loggedUsersSelector } from 'src/app/store/loggedUser/users/loggedUser.selectors';

@Injectable()
export class GithubInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request: HttpRequest<any>) {
    const loggedUser: LoggedUserStateInterface = this.getValue(
      this.store.pipe(select(loggedUsersSelector))
    );
    if (loggedUser.user.id !== -1) {
      return request.clone({
        setHeaders: {
          Authorization: 'token ' + loggedUser.user.token,
        },
      });
    } else {
      return request;
    }
  }
  getValue(obj: Observable<any>) {
    let value: any;
    obj.subscribe((v) => (value = v));
    return value;
  }
}
