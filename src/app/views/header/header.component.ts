import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../models/User';
import { setLoggedUser } from '../../store/users/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<{}>) {}

  ngOnInit(): void {}

  logout() {
    const loggedUser: User = {
      login: '',
      name: '',
      avatar_url: '',
      followers: 0,
      public_repos: 0,
      id: -1,
    };
    this.store.dispatch(setLoggedUser({ user: loggedUser }));
  }
}
