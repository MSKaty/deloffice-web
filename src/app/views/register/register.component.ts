import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';
// import { MustMatch } from './_helpers/must-match.validator';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  type = 1;

  uid: number;
  fname: string;
  lname: string;
  address: string;
  vat: string;
  brn: string;
  activity: string;
  cperson:string;
  mob: number;
  fax: number;
  email: string;
  password: string;
  tel: string;
  utype:number;

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    ) {}

    ngOnInit(){
      this.registerForm = this.fb.group({
        fname: [null, Validators.required],
        lname: [null, Validators.required],
        address: [null, Validators.required],
        vat: [null, Validators.required],
        brn: [null, Validators.required],
        activity: [null, Validators.required],
        tel: [null, Validators.required],
        cperson: [null, Validators.required],
        mob: [null, Validators.required],
        fax:[null, Validators.required],
        email: [null, Validators.required],
        password: [null, Validators.required],
        utype:[null, Validators.required]
        //confirm_password: [null, Validators.required],
    
    })
    }
    public register(userdata){
      const postData ={
  
        // cusid: this.registerForm.value,
        email: this.email, 
        password: this.password,
        fname: this.fname,
        lname: this.lname,
        mob: this.mob,
        tel: this.tel,
        fax: this.fax,
        address: this.address,
        activity: this.activity,
        cperson: this.cperson,
        brn: this.brn,
        vat: this.vat,
        utype: this.utype
  
      };
      this._auth.register(this.registerForm.value,)
     
      .subscribe(
        data  =>{
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
  
  // uid: number;
  // fname: string;
  // lname: string;
  // address: string;
  // vat: string;
  // brn: string;
  // activity: string;
  // cperson:string;
  // mob: number;
  // fax: number;
  // email: string;
  // password: string;
  // tel: string;
  // utype:number;
  //confirm_password: string;

  

  
    // 	active
    // pricelist			
    // 	billingaddress		director	
   		// minorder	deliveryfee	handlingfee	
  

  
    
 

  // public register(userdata){
  //   const postData ={

  //     // cusid: this.registerForm.value,
  //     email: this.email, 
  //     password: this.password,
  //     fname: this.fname,
  //     lname: this.lname,
  //     mob: this.mob,
  //     tel: this.tel,
  //     fax: this.fax,
  //     address: this.address,
  //     activity: this.activity,
  //     cperson: this.cperson,
  //     brn: this.brn,
  //     vat: this.vat,
  //     utype: this.utype

  //   };
  //   this._auth.register(this.registerForm.value,)
   
  //   .subscribe(
  //     data  =>{
  //       console.log(data);
  //       this._router.navigate['/login']
  //     },
  //     err => {
  //       console.log(err);
  //       this.registerForm.reset();
  //     },
  //     () => {
  //       console.log('done');
  //     }
  //   );
  // }

// }
