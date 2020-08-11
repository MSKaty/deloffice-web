import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../common/services/category.service';
import { Observable } from 'rxjs';
import { AdvertService } from 'src/app/common/services/advert.service';
import { tap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/common/services/contact.service';
import { AlertService } from 'src/app/common/services/alert.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  category$: Observable<any>;

  home1$: Observable<any>;

  inquiryForm: FormGroup = this.fb.group({
    to: ['', Validators.required],
    name: ['', Validators.required],
    from: ['', Validators.required],
    phone: ['', Validators.required],
    subject: ['', Validators.required],
    text: ['', Validators.required],
  })

  constructor(
    private _ads: AdvertService,
    private _cat: CategoryService,
    private contactF: AuthService,
    private _alert: AlertService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.category$ = this._cat.getTree();
    this.home1$ = this.getAdvertsByPage('home');
  }

  getAdvertsByPage(id: string) {
    return this._ads.getAdvertsByPage(id).valueChanges()
      .pipe(
        map((array) => {
          return array[0];
        })
      );
    ;
  }

  public inquirySend() {
    const { name, from, phone, subject, text } = this.inquiryForm.value;
    const postObject = {
      to: 'Sales Department <sales@deloffice.mu>',
      from: `${name} <${from}>`,
      subject: `Product Inquiry: ${subject}`,
      text: `Phone: ${phone}<br>${text}`
    }
    this.contactF.sendMail(postObject)
      .subscribe(
        (data) => {
          this._alert.success('Inquiry has been Sent !');
          this.inquiryForm.reset();
        },
        (err) => {
          this._alert.error('Inquiry has NOT been Sent !');
        },
        () => {

        }
      );
  }

}
