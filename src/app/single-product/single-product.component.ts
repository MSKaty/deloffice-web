import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../common/services/product.service';

import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TitleService } from '../common/services/title.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  product$: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _prod: ProductService,
    private _title: TitleService
  ) { }

  ngOnInit() {
    this.product$ = this.get().pipe(
      tap((product) => {
        this._title.changeTitle(product.des1);
      })
    );
  }

  get() {
    return this._route.params.pipe(
      switchMap(param => {
        return this._prod.findOne(param['id']);
      })
    )
  }

  getVideo() {

  }

}
