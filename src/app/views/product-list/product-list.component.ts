import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../common/services/product.service';
import { CategoryService } from '../../common/services/category.service';
import { TitleService } from '../../common/services/title.service';

import { Observable, combineLatest } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  currentPage = 1;
  category$: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _prod: ProductService,
    private _cat: CategoryService,
    private _title: TitleService
  ) { }

  ngOnInit() {
    this.category$ = this.get().pipe(
      map(([category, productdata]) => {
        this._title.changeTitle(category.description);
        return { category, productdata: productdata[0] };
      }),
      tap((data) => {
        console.log(data);
      })
      // tap((category) => { this._title.changeTitle(category.des1) })
    )
  }
  get() {
    return this._route.params.pipe(
      // switchMap(query => {
      //   const page = query['p'] ? query['p'] : 1;
      //   this.currentPage = page;
      //   return this._prod.findAll(null, page, query['s']);
      // }),
      switchMap(param => {
        return combineLatest(
          this._cat.getCat(param['id']),
          this._prod.findAll(param['id'])
        )
      })
    )
  }
  tempArray(num) {
    const baseArr = Array.from(
      Array(Math.ceil(num / 20)),
      (_, i) => i + 1
    );
    return baseArr.filter(item => {
      if (item < this.currentPage + 3 || item > this.currentPage - 3) {
        return item;
      }
    })
  }
}
