import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../../common/services/category.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userdata = null;
  category$: Observable<any>;
  searchKeyword: string;

  userAccount$: Observable<any>;

  constructor(
    private _cat: CategoryService,
    private _router: Router,
    private user: AuthService,
    private _route: ActivatedRoute,

  ) { }
  ngOnInit() {
    this.category$ = this._cat.getTree();
    this.checkUserdata();


    this.userAccount$ = this.get().pipe(
      tap((data) => { console.log(data) })
    )


  }

  get() {
    return this._route.params.pipe(
      switchMap(param => {
        return this.user.getAccount();
      })
    )
  }

  search() {
    this._router.navigate(['/search'], { queryParams: { s: this.searchKeyword } })
  }

  checkUserdata() {
    this.userdata = JSON.parse(window.localStorage.getItem('user'))
    setInterval(() => {
      this.userdata = JSON.parse(window.localStorage.getItem('user'))
    }, 5000);
  }

}
