import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup = this.fb.group({
    emailTo: ['', Validators.required],
    name: ['', Validators.required],
    emailSender: ['', Validators.required],
    phone: ['', Validators.required],
    subject: ['', Validators.required],
    msg: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  }

  public inquirySend() {

  }

}
