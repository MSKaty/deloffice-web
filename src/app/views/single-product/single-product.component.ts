import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../common/services/product.service';

import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TitleService } from '../../common/services/title.service';
import { OrderService } from '../../common/services/order.service';
import { AlertService } from 'src/app/common/services/alert.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  product$: Observable<any>;
  public userdata: any = JSON.parse(window.localStorage.getItem('user'));

  prevCount: number = 1;
  nextCount: number = 4;

  constructor(
    private _route: ActivatedRoute,
    private _prod: ProductService,
    private _title: TitleService,
    private _order: OrderService,
    private _alert: AlertService
  ) { }

  ngOnInit() {
    this.product$ = this.get().pipe(
      tap((product) => {
        this._title.changeTitle(product.des1);
      })
    );
  }

  increasePrev() {
    this.prevCount--;
    this.nextCount--;
  }
  increaseNext() {
    this.prevCount++;
    this.nextCount++;
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
          this._alert.success('Product Added To Cart!');
        },
        (err) => {
          console.log(err)
          this._alert.error('Product NOT Added To Cart!');
        },
        () => {
          console.log('done');
        }
      )
  }

  public addToWishlist(item, qty) {
    const postWishData = {
      custId: this.userdata.uid,
      productId: item.id,
      quantity: +qty
    };
    // console.log(postData)
    this._order.addToWishlist(postWishData)
      .subscribe(
        (data) => {
          console.log(data);
          this._alert.success('Product Added To Wishlist!');
        },
        (err) => {
          console.log(err);
          this._alert.error('Product NOT Added To Wishlist!');
        },
        () => {
          console.log('done')
          console.log(postWishData)
        }
      )
  }

}
