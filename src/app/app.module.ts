import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import {
  loginReducer,
  oneUserReducer,
  usersReducer,
} from './store/users/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './store/users/user.effects';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './strategy/custom-route-reuse.strategy';

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
    EffectsModule.forRoot([UserEffect]),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
  ],
})
export class AppModule {}
