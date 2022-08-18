import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersResolver } from '../../resolvers/users.resolver';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersTreeComponent } from './users-tree/users-tree.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
    children: [
      {
        path: 'list',
        component: UsersTreeComponent,
        data: {
          reuseComponent: true,
          key: 'list_comp',
        },
      },
      {
        path: ':login',
        component: UserDetailComponent,
        resolve: {
          userFromStore: UsersResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
