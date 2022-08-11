// AuthGuard Service
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectOneUser } from '../store/users/user.selectors';


@Injectable()
export class DetailGuard implements CanActivate {


  constructor(private store: Store, private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
    // this.store.select(selectOneUser).subscribe((user) => {
    //   console.log('user', user)
    //   return true;
    // })
    // this.store.select(selectOneUser).
    return true;
  }


}
