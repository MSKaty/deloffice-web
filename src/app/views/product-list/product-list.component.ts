import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductcategoryService } from '../../common/services/productcategory.service';

import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TitleService } from '../../common/services/title.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  category$: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _cat: ProductcategoryService,
    private _title: TitleService) { }

  ngOnInit() {
    this.category$ = this.get().pipe(
      tap((category) => { this._title.changeTitle(category.des1) })
    )
  }
  get() {
    return this._route.params.pipe(
      switchMap(param => {
        return this._cat.catfind(param['id']);
      })
    )
  }

}
