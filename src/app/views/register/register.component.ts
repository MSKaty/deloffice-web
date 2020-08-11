import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  type = 3;

  public registerForm: FormGroup = this.fb.group({
    fname: ['', Validators.required],
    lname: [''],
    address: ['', Validators.required],
    vat: [''],
    brn: [''],
    activity: [''],
    tel: ['', Validators.required],
    cperson: [''],
    mob: [''],
    fax: [''],
    email: ['', [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    confirmPassword: [null, Validators.required],
    utype: [null],
    acceptTerms: [false, Validators.requiredTrue]
  }, {
    validator: MustMatch('password', 'confirmPassword')
  })

  @ViewChild('corpBtn', { static: true }) corpBtn: ElementRef;
  @ViewChild('reselBtn', { static: true }) reselBtn: ElementRef;
  @ViewChild('indiBtn', { static: true }) indiBtn: ElementRef;

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _alert: AlertService
  ) { }
  ngAfterViewInit() {
   
  }
  
  registInver(name){
    (this.corpBtn.nativeElement as HTMLElement).classList.remove("active");
    (this.reselBtn.nativeElement as HTMLElement).classList.remove("active");
    (this.indiBtn.nativeElement as HTMLElement).classList.remove("active");

    switch(name){
      case 'corpBtn':
        (this.corpBtn.nativeElement as HTMLElement).classList.add("active");
        (this.reselBtn.nativeElement as HTMLElement).classList.remove("active");
        (this.indiBtn.nativeElement as HTMLElement).classList.remove("active");
      break;
      case 'reselBtn':
        (this.corpBtn.nativeElement as HTMLElement).classList.remove("active");
        (this.reselBtn.nativeElement as HTMLElement).classList.add("active");
        (this.indiBtn.nativeElement as HTMLElement).classList.remove("active");
      break;
      case 'indiBtn':
        (this.corpBtn.nativeElement as HTMLElement).classList.remove("active");
        (this.reselBtn.nativeElement as HTMLElement).classList.remove("active");
        (this.indiBtn.nativeElement as HTMLElement).classList.add("active");
      break;
    }
    
  }

  ngOnInit(): void { }

  public register(typeN: number) {
    this.submitted = true;
    switch (typeN) {
      case 1:
        ///individual

        break;
      case 2:
        ///reseller
        this.registerForm.controls['cperson'].setValidators([Validators.required]);
        this.registerForm.controls['activity'].setValidators([Validators.required]);
        break;
      case 3:
        ///corporate
        this.registerForm.controls['brn'].setValidators([Validators.required]);
        this.registerForm.controls['cperson'].setValidators([Validators.required]);
        this.registerForm.controls['activity'].setValidators([Validators.required]);
        break;
    }

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.registerForm.controls['utype'].setValue(this.type);
    // console.log(this.registerForm.value);
    this._auth.register(this.registerForm.value).subscribe(
      data => {
        // console.log(data);
        this._router.navigate(['/login'])
        this._alert.success('Registration Done');
      },
      err => {
        // console.log(err);
        this.registerForm.reset();
        this._alert.error('Please input your details correctly');
      },
      () => {
        // console.log('done');
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.registerForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
  // Type {{ findInvalidControls() | json }}
  public removeValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key).clearValidators();
      form.get(key).updateValueAndValidity();
    }
  }
  // [disabled]="!registerForm.valid"
}
