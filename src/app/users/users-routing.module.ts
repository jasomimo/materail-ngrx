import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersResolver } from '../resolvers/users.resolver';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersTreeComponent } from './components/users-tree/users-tree.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
    children: [
      {
        path: '', // child route path
        component: UsersTreeComponent, // child route component that the router renders
      },
      {
        path: ':login',
        component: UserDetailComponent,
        resolve: { newUser: UsersResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
