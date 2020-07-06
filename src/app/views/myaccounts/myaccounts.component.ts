import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {AuthService} from 'src/app/common/services/auth.service';
@Component({
  selector: 'app-myaccounts',
  templateUrl: './myaccounts.component.html',
  styleUrls: ['./myaccounts.component.scss']
})
export class MyaccountsComponent implements OnInit {
  
  uid:number;
  fname:string;
  lname:string;
  address:string;
    

  form: FormGroup
  
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {

  }

}
