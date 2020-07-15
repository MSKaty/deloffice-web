import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/common/services/alert.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-myaccounts',
  templateUrl: './myaccounts.component.html',
  styleUrls: ['./myaccounts.component.scss']
})
export class MyaccountsComponent implements OnInit {
  private _userList$ = new BehaviorSubject<any[]>([]);
  public userList$: Observable<any[]> = this._userList$.asObservable()

  public userdata: any = JSON.parse(window.localStorage.getItem('user'));

  userAccount$: Observable<any>;
  uid: number
  email: string
  fname: string
  lname: string
  mob: number
  tel: number
  fax: number
  address: string
  cperson: string
  brn: string
  vat: string

  public userForm: FormGroup = this.fb.group({
    uid: [null, Validators.required],
    email: [null, Validators.required],
    fname: [null, Validators.required],
    lname: [null, Validators.required],
    mob: [null, Validators.required],
    tel: [null, Validators.required],
    fax: [null, Validators.required],
    address: [null, Validators.required],
    cperson: [null, Validators.required],
    brn: [null, Validators.required],
    vat: [null, Validators.required],

  })


  constructor(
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    private _user: AuthService,
    private _alert: AlertService,

  ) { }

  ngOnInit() {
    ///get user data from DB upon loading
    this.userAccount$ = this.get().pipe(
      tap((data) => { console.log(data) })
    )
  }

  get() {
    return this._route.params.pipe(
      switchMap(param => {
        return this._user.getAccount();
      }),
      tap((v) => {
        //fill in the reactive form with patchValue
        this.userForm.patchValue(v)
      })

    )
  }

  public updateuser() {
    this._user.updateUser(this.userForm.value).subscribe(
      (data) => {
        console.log(data);
        this._alert.success('Your New Information has been Updated.');
      },
      (err) => {
        console.log(err);
        this._alert.error('Your New Information has NOT been Updated!');
      },
      () => {
        console.log('done');
      }
    )
  }

}
