import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { AlertService } from 'src/app/common/services/alert.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { MustMatch } from 'src/app/common/utils/must-match.validator';

@Component({
  selector: 'app-update-pass',
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.scss']
})
export class UpdatePassComponent implements OnInit {
  private _userList$ = new BehaviorSubject<any[]>([]);
  public userList$: Observable<any[]> = this._userList$.asObservable()

  public userdata: any = JSON.parse(window.localStorage.getItem('user'));

  userAccount$: Observable<any>;

  public userForm: FormGroup = this.fb.group({
    'newPass': [null, Validators.required],
    'confrmPass': [null, Validators.required],
  }
    // , {
    //   validator: MustMatch('password', 'confirmPassword')
    // }
  )

  constructor(
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    private _user: AuthService,
    private _alert: AlertService,
  ) {

  }

  ngOnInit() {
    ///get user data from DB upon loading
    this.userAccount$ = this.get().pipe(
      // tap((data) => { 
        // console.log(data) 
      // })
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

  //  Property declaration for hide/show password

  fieldTextTypeNew: boolean;
  fieldTextTypeCon: boolean;
  // Switching method
  toggleFieldTextTypeNew() {
    this.fieldTextTypeNew = !this.fieldTextTypeNew;
  }
  toggleFieldTextTypeCon() {
    this.fieldTextTypeCon = !this.fieldTextTypeCon;
  }

  updatePass() {
    this._user.updateUser({ password: this.userForm.value.newPass }).subscribe(
      (data) => {
        // console.log(data);
        this._alert.success('Your New Password has been Updated.');
      },
      (err) => {
        // console.log(err);
        this._alert.error('Your New Password has NOT been Updated!');
      },
      () => {
        // console.log('done');
      }
    )

  }

}
