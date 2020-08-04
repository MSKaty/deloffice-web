import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../../common/services/title.service';

import { Observable, combineLatest, BehaviorSubject, timer, of } from 'rxjs';
import { OrderService } from 'src/app/common/services/order.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { AlertService } from 'src/app/common/services/alert.service';
import { ProductService } from 'src/app/common/services/product.service';

@Component({
  selector: 'app-useful-list',
  templateUrl: './useful-list.component.html',
  styleUrls: ['./useful-list.component.scss']
})
export class UsefulListComponent implements OnInit {

  private _promo$ = new BehaviorSubject<any[]>([]);
  public promo$: Observable<any[]> = this._promo$.asObservable();
  
  public userdata: any = JSON.parse(window.localStorage.getItem('user'));

  constructor(
    private _route: ActivatedRoute,
    private _title: TitleService,
    private _order: OrderService,
    private _alert: AlertService,
    private _product : ProductService
  ) { }

  ngOnInit() {

    this.promo$ = this.get().pipe(
      map(
        (data:any) => {
          // console.log(data);
          this._title.changeTitle(data.description);
          return data;
        }
      ),
      tap(
        (data) => {
          
        }
      )
    );

  }

  get(){
    return combineLatest(
      this._route.params,
      this._route.queryParams
    ).pipe(
      switchMap(
        (data) => {
          return combineLatest(
            this._product.findNew()
          )
        }
      )
    )
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
          console.log('done')
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

  //promo title
  promoType = {
    1: 'New Arrival',
    2: 'Special Offers',
    3: 'Clearance Sales',
    4: 'Best Sellers'
  };

}
