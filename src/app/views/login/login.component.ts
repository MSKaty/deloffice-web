import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../common/services/auth.service'

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

  constructor(
    private fb:FormBuilder,
    private authService: AuthService
    ) { 
      
      
    
  }

  ngOnInit() {
    this.form = this.fb.group({
      uname: new FormControl('', Validators.required),
      pswd: new FormControl('', Validators.required)
      
    });
  }

}
