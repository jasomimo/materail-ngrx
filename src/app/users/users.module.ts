import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ViewComponent } from './view/view.component';
import { UsersTreeComponent } from './components/users-tree/users-tree.component';
import {MatTreeModule} from '@angular/material/tree'
import {MatIconModule} from '@angular/material/icon'
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [
    ViewComponent,
    UsersTreeComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule
  ]
})
export class UsersModule { }
