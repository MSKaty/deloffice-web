import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';

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
    brn: ['', Validators.required],
    activity: ['', Validators.required],
    tel: ['', Validators.required],
    cperson: ['', Validators.required],
    mob: ['', Validators.required],
    fax: ['', Validators.required],
    email: ['', Validators.required],
    password: [null, Validators.required],
    utype: [null, Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void { }

  public register() {
    this.submitted = true;
    this.registerForm.controls['utype'].setValue(this.type);
    console.log(this.registerForm.value);
    this._auth.register(this.registerForm.value).subscribe(
      data => {
        console.log(data);
        this._router.navigate['/login']
      },
      err => {
        console.log(err);
        this.registerForm.reset();
      },
      () => {
        console.log('done');
      }
    );
  }

}
