import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../common/services/category.service';
import { Observable } from 'rxjs';
import { AdvertService } from 'src/app/common/services/advert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  category$: Observable<any>;

  home1$: Observable<any>;

  constructor(
    private _ads: AdvertService,
    private _cat: CategoryService
  ) { }

  ngOnInit() {
    this.category$ = this._cat.getTree();
    this.home1$ = this.getAdvertsByPage('slidebar');
  }

  getAdvertsByPage(id: string) {
    return this._ads.getAdvertsByPage(id).valueChanges();
  }

}
