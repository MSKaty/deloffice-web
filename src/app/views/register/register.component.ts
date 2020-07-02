import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  uid: number;
  fname: string;
  lname: string;
  address: string;
  vat: string;
  brn: string;
  field_of_activity: string;
  contact_person:string;
  mob: number;
  fax: number;
  mail: string;
  password: string;
  confirm_password: string;

  type = 1;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      vat: new FormControl('', Validators.required),
      brn: new FormControl('', Validators.required),
      field_of_activity: new FormControl('', Validators.required),
      contact_person: new FormControl('', Validators.required),
      mob: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      mail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),

      // 	email	password	active	utype	
      // pricelist			tel	fax	
      // address	billingaddress	activity	director	
      // cperson	brn	vat	minorder	deliveryfee	handlingfee	


    });
  }

  ngOnInit() {
  }

}
