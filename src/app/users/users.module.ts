import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ViewComponent } from './view/view.component';
import { UsersTreeComponent } from './components/users-tree/users-tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserCardComponent } from './components/user-detail/user-card/user-card.component';
import { MatCardModule } from '@angular/material/card';
import { RepoTableComponent } from './components/user-detail/repo-table/repo-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DetailGuard } from '../guards/DetailGuard';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    ViewComponent,
    UsersTreeComponent,
    UserDetailComponent,
    UserCardComponent,
    RepoTableComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    FormsModule,
    MatToolbarModule,
  ],
  providers: [DetailGuard],
})
export class UsersModule {}
