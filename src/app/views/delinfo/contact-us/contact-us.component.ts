import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/common/services/contact.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup = this.fb.group({
    to: ['', Validators.required],
    name: ['', Validators.required],
    from: ['', Validators.required],
    phone: ['', Validators.required],
    subject: ['', Validators.required],
    text: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private contactF: AuthService
  ) { }

  ngOnInit() {
  }

  public inquirySend() {
    const { to, name, from, phone, subject, text } = this.contactForm.value;
    const postObject = {
      to: to,
      from: `${name} <${from}>`,
      subject,
      text
    }
    this.contactF.sendMail(postObject)
      .subscribe(
        (data) => {

        },
        (err) => {

        },
        () => {

        }
      );
  }

}
