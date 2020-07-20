import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../common/services/category.service';
import { Observable } from 'rxjs';
import { AdvertService } from 'src/app/common/services/advert.service';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent implements OnInit {
  category$: Observable<any>;
  slidebar$: Observable<any>;

  constructor(
    private _ads: AdvertService,
    private _cat: CategoryService
  ) { }

  ngOnInit() {
    this.category$ = this._cat.getTree();
    this.slidebar$ = this.getAdvertsByPage('slidebar');
  }

  getAdvertsByPage(id: string) {
    return this._ads.getAdvertsByPage(id).valueChanges();
  }

}
