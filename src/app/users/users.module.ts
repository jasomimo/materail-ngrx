import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ViewComponent } from './view/view.component';
import { UsersTreeComponent } from './components/users-tree/users-tree.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserCardComponent } from './components/user-detail/user-card/user-card.component';
import { RepoTableComponent } from './components/user-detail/repo-table/repo-table.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { MaterialModule } from '../material.module';

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
  providers: [],
})
export class UsersModule {}
