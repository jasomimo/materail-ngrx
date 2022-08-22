import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GithubService } from 'src/app/services/github.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import {
  retrieveLoggedUser,
  setLoggedUserSuccess,
} from 'src/app/store/loggedUser/users/loggedUser.actions';
import { catchError, Observable, Subscription, take } from 'rxjs';
import {
  loggedUsersSelector,
  loggedUserIsLoadingSelector,
  loggedUsererrorSelector,
} from '../../../../store/loggedUser/users/loggedUser.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    token: new FormControl('', Validators.required),
  });

  isLoading$: Observable<boolean>;
  firstOpen = true;

  loggedUser$: Subscription;
  errorMessage$: Subscription;

  constructor(
    private githubService: GithubService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store<{}>
  ) {
    this.isLoading$ = this.store.pipe(select(loggedUserIsLoadingSelector));
  }

  ngOnInit(): void {
    this.loggedUser$ = this.store
      .pipe(select(loggedUsersSelector))
      .subscribe((state) => {
        if (state.user.id !== -1) {
          this.router.navigate(['/users/list']);
        }
      });

    this.errorMessage$ = this.store
      .pipe(select(loggedUsererrorSelector))
      .subscribe((state) => {
        if (!this.firstOpen && state !== '') {
          this.openSnackBar(state, 'Ok');
        }
        this.firstOpen = false;
      });
  }

  ngOnDestroy(): void {
    this.loggedUser$.unsubscribe();
    this.errorMessage$.unsubscribe();
  }

  login() {
    const token = this.loginForm.controls['token'].value;
    if (token) this.store.dispatch(retrieveLoggedUser({ loginToken: token }));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  setUser() {
    const user = {
      login: 'Unknown',
      followers: -1,
      avatar_url: 'https://avatars.githubusercontent.com/u/9919?s=40&v=4',
      id: -1,
      name: 'Unknown user',
      public_repos: -1,
    };

    this.store.dispatch(setLoggedUserSuccess({ user: user }));
  }
}
