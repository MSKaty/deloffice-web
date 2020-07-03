import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../../common/services/category.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userdata = null;
  category$: Observable<any>;
  searchKeyword: string;

  constructor(
    private _cat: CategoryService,
    private _router: Router
  ) { }
  ngOnInit() {
    this.category$ = this._cat.getTree();
    this.checkUserdata();
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
