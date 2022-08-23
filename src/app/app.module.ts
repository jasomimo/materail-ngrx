import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { usersReducer } from './store/users/user.reducer';
import { oneUserReducer } from './store/fullUser/users/usersList.reducer';
import { loginReducer } from './store/loggedUser/users/loggedUser.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './store/users/user.effects';
import { UserListEffect } from './store/fullUser/users/usersList.effects';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './strategy/custom-route-reuse.strategy';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { LoggedUserEffect } from './store/loggedUser/users/loggedUser.effects';
import { GithubInterceptor } from './services/interceptor/github.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        users: usersReducer,
        fullUser: oneUserReducer,
        loggedUser: loginReducer,
      },
      {}
    ),
    EffectsModule.forRoot([UserEffect, UserListEffect, LoggedUserEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    MatSnackBarModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
    { provide: HTTP_INTERCEPTORS, useClass: GithubInterceptor, multi: true },
  ],
})
export class AppModule {}
