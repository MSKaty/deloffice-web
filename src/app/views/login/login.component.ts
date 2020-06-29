import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb:FormBuilder) { 
    this.form = this.fb.group({
      uname: new FormControl('', Validators.required),
      pswd: new FormControl('', Validators.required)
      
    });
  }

  ngOnInit() {
  }

}
