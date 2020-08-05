import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
import { AlertService } from 'src/app/common/services/alert.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  form: FormGroup;

  uid: number;
  uname: string;
  pswd: string;

  public loginForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _alert: AlertService
  ) { }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  public login() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this._auth.login(this.loginForm.value).pipe(
      switchMap(data => {
        return this._auth.getProfile()
      }),
      tap(data => {
        if (data) {
          window.localStorage.setItem('user', JSON.stringify(data));
        }
      })
    )
      .subscribe(
        data => {
          console.log(data);
          this._router.navigate(['/']);
          this._alert.success('Welcome Back');
        },
        error => {
          console.log(error);
          this.loginForm.reset();
          this._alert.error('Login Error');
        },
        () => {
          console.log('HTTP request completed');

        }
      );
  }

}
