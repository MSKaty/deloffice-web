import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../common/services/category.service';
import { Observable } from 'rxjs';
import { AdvertService } from 'src/app/common/services/advert.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-slide-carousel',
  templateUrl: './slide-carousel.component.html',
  styleUrls: ['./slide-carousel.component.scss']
})
export class SlideCarouselComponent implements OnInit {

  slidebar$: Observable<any>;

  constructor(
    private _ads: AdvertService,
    private _cat: CategoryService
  ) { }

  ngOnInit() {
    this.slidebar$ = this.getAdvertsByPage('slidebar');
  }

  getAdvertsByPage(id: string) {
    return this._ads.getAdvertsByPage(id).valueChanges()
      .pipe(
        map((array) => {
          return array[0];
        })
      );
  }

}
