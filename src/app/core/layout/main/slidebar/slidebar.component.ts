import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../common/services/category.service';
import { Observable } from 'rxjs';
import { AdvertService } from 'src/app/common/services/advert.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent implements OnInit {
  category$: Observable<any>;
  slidebar$: Observable<any>;

  selCat : string;

  constructor(
    private _ads: AdvertService,
    private _cat: CategoryService
  ) { }

  ngOnInit() {
    this.category$ = this._cat.getTree();
    this.slidebar$ = this.getAdvertsByPage('slidebar');


    // this.slidebar$.pipe(tap(console.log));

    // const newLocal = this.slidebar$.pipe(tap(
      // console.log
      // ));
    // newLocal.subscribe(res => 
      // console.log(res)
      // );
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
