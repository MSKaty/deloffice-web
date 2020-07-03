import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  uid: number;
  uname: string;
  pswd: string;

  public loginForm: FormGroup = this._fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  })

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void { }

  public login() {
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
          this._router.navigate(['/'])
        },
        err => {
          console.log(err);
          this.loginForm.reset();
        },
        () => {
          console.log('done');

        }
      );
  }

}
