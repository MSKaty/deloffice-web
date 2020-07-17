import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/services/alert.service';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from 'src/app/common/utils/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  type = 1;

  public registerForm: FormGroup = this.fb.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    address: ['', Validators.required],
    vat: ['', Validators.required],
    brn: [''],
    activity: ['', Validators.required],
    tel: ['', Validators.required],
    cperson: ['', Validators.required],
    mob: ['', Validators.required],
    fax: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    confirmPassword: [null, Validators.required],
    utype: [null, Validators.required],
    acceptTermsR: [false, Validators.requiredTrue],
    acceptTermsC: [false, Validators.requiredTrue],
    acceptTermsI: [false, Validators.requiredTrue],
  }, {
    validator: MustMatch('password', 'confirmPassword')
  })

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _alert: AlertService
  ) { }

  ngOnInit(): void { }

  public register() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.registerForm.controls['utype'].setValue(this.type);
    console.log(this.registerForm.value);
    this._auth.register(this.registerForm.value).subscribe(
      data => {
        console.log(data);
        this._router.navigate['/login']
        this._alert.success('Registration Done');
      },
      err => {
        console.log(err);
        this.registerForm.reset();
        this._alert.error('Please input your details correctly');
      },
      () => {
        console.log('done');
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


}
