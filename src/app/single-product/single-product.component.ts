import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../common/services/product.service';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  product$: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _prod: ProductService
  ) { }

  ngOnInit() {
    this.product$ = this.get();
  }

  get() {
    return this._route.params.pipe(
      switchMap(param => {
        return this._prod.findOne(param['id']);
      })
    )
  }

}
