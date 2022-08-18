import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ViewComponent } from './view/view.component';
import { UsersTreeComponent } from './users-tree/users-tree.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserCardComponent } from './user-detail/user-card/user-card.component';
import { RepoTableComponent } from './user-detail/repo-table/repo-table.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { MaterialModule } from '../../material.module';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from 'src/app/strategy/custom-route-reuse.strategy';

@NgModule({
  declarations: [
    ViewComponent,
    UsersTreeComponent,
    UserDetailComponent,
    UserCardComponent,
    RepoTableComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, FormsModule, MaterialModule],
})
export class UsersModule {}
