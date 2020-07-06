import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../common/services/product.service';

import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TitleService } from '../../common/services/title.service';
import { OrderService } from '../../common/services/order.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  product$: Observable<any>;
  public userdata: any = JSON.parse(window.localStorage.getItem('user'));

  constructor(
    private _route: ActivatedRoute,
    private _prod: ProductService,
    private _title: TitleService,
    private _order: OrderService
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
  public addToCart(item, qty) {
    const postData = {
      cusid: this.userdata.uid,
      depid: 0,
      level: '',
      proid: item.id,
      quantity: +qty
    };
    // console.log(postData)
    this._order.addToCart(postData)
      .subscribe(
        (data) => {
          console.log(data)
        },
        (err) => {
          console.log(err)
        },
        () => {
          console.log('done')
        }
      )
  }

}
