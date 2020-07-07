import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { TitleService } from '../../common/services/title.service';

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
 
  public form: FormGroup = this.fb.group({
    uid: [null, Validators.required],
    email: [null, Validators.required],
    fname: [null, Validators.required],
    lname:[null, Validators.required],
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
    private _title: TitleService
    
    ) {}

  ngOnInit() {
    this.userAccount$ = this.get().pipe(
      tap((user) => {
        this._title.changeTitle(user);
        return(user);

      }),

      tap((data) =>{console.log(data)})
    )
  }

  get(){
    return this._route.params.pipe(
      switchMap(param => { 
        return this._user.getAccount();
      })
    )
  }



}
