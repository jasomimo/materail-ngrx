import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GithubService } from 'src/app/services/github.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  showSpinner = false;
  constructor(
    private githubService: GithubService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  login() {
    this.showSpinner = true;
    const name = this.loginForm.controls['name'].value;
    const password = this.loginForm.controls['password'].value;

    if (name && password)
      this.githubService.login(name, password).subscribe(
        (data) => {
          console.log(data);
          // this.router.navigate(['/users'])
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
