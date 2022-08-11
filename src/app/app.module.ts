import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import {oneUserReducer, usersReducer} from './store/users/user.reducer';
import { DetailGuard } from './guards/DetailGuard';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatButtonModule,
    StoreModule.forRoot({users: usersReducer, user: oneUserReducer}, {}),

  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
