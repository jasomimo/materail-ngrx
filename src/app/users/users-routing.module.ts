import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersTreeComponent } from './components/users-tree/users-tree.component';
import { ViewComponent } from './view/view.component';
import { DetailGuard } from '../guards/DetailGuard';

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
        path: 'detail',
        component: UserDetailComponent,
        canActivate: [DetailGuard] // another child route component that the router renders
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
