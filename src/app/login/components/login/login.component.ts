import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GithubService } from 'src/app/services/github.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { setLoggedUser } from 'src/app/store/users/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    token: new FormControl('', Validators.required),
  });

  showSpinner = false;
  constructor(
    private githubService: GithubService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store<{}>
  ) {}

  login() {
    this.showSpinner = true;
    const token = this.loginForm.controls['token'].value;

    if (token)
      this.githubService.login(token).subscribe(
        (data) => {
          this.store.dispatch(setLoggedUser({ user: data }));
          this.router.navigate(['/users']);
          this.showSpinner = false;
        },
        (error) => {
          console.log(error);
          this.showSpinner = false;
          this.openSnackBar(error.error.message, 'Ok');
        }
      );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
