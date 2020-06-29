import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../common/services/user.service';
import { TitleService } from '../../common/services/title.service';

import { Observable, Subscription} from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user$: Observable<any>

  constructor() { }

  ngOnInit() {
  }

}
