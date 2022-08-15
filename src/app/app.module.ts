import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import {
  loginReducer,
  oneUserReducer,
  usersReducer,
} from './store/users/user.reducer';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './store/users/user.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatButtonModule,
    StoreModule.forRoot(
      { users: usersReducer, user: oneUserReducer, loggedUser: loginReducer },
      {}
    ),
    EffectsModule.forRoot([UserEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
