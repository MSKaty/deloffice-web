import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/common/services/contact.service';
import { AlertService } from 'src/app/common/services/alert.service';


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
    private contactF: AuthService,
    private _alert: AlertService,
  ) { }

  ngOnInit() {
  }

  public inquirySend() {
    const { to, name, from, phone, subject, text } = this.contactForm.value;
    const postObject = {
      to: to,
      from: `${name} <${from}>`,
      subject,
      text: `${text} <br> Phone: ${phone}`
    }
    this.contactF.sendMail(postObject)
      .subscribe(
        (data) => {
          this._alert.success('Inquiry has been Sent !');
          this.contactForm.reset();
        },
        (err) => {
          this._alert.error('Inquiry has NOT been Sent !');
        },
        () => {

        }
      );
  }

}
