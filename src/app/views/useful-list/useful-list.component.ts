import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../../common/services/title.service';

import { Observable, combineLatest, BehaviorSubject, timer, of } from 'rxjs';
import { OrderService } from 'src/app/common/services/order.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { AlertService } from 'src/app/common/services/alert.service';
import { ProductService } from 'src/app/common/services/product.service';
import { AdvertService } from 'src/app/common/services/advert.service';

@Component({
  selector: 'app-useful-list',
  templateUrl: './useful-list.component.html',
  styleUrls: ['./useful-list.component.scss']
})
export class UsefulListComponent implements OnInit {

  private _promo$ = new BehaviorSubject<any[]>([]);
  public promo$: Observable<any[]> = this._promo$.asObservable();

  public userdata: any = JSON.parse(window.localStorage.getItem('user'));

  promoTitle: string;
  promoBanner$: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _title: TitleService,
    private _order: OrderService,
    private _alert: AlertService,
    private _product: ProductService,
    private _ads: AdvertService
  ) { }

  ngOnInit() {
    this.promo$ = this.get().pipe(
      tap(
        (data) => {
          // console.log(data);
        }
      )
    );

  }

  get(){
    return this._route.params.pipe(
      switchMap(
        (param) => {
          let urlBit;
          switch (param.id) {
            case 'new-arrival':
              this._title.changeTitle('New Arrival');
              urlBit = 'new';
              this.promoTitle ='New Arrival';
              this.promoBanner$ = this.getPromoBannerByPage('New');
              break;
            case 'best-sellers':
              this._title.changeTitle('Best Sellers');
              urlBit = 'best';
              this.promoTitle ='Best Sellers';
              this.promoBanner$ = this.getPromoBannerByPage('Best');
              break;
            case 'clearance-sales':
              this._title.changeTitle('Clearance Sales');
              urlBit = 'clearance';
              this.promoTitle ='Clearance Sales';
              this.promoBanner$ = this.getPromoBannerByPage('Clearance');
              break;
            case 'special-offers':
              this._title.changeTitle('Special Offers');
              urlBit = 'special';
              this.promoTitle ='Special Offers';
              this.promoBanner$ = this.getPromoBannerByPage('Special');
              break;
          }
          return this._product.findExtra(urlBit);
        }
      )
    );
  }

  ///banner
  getPromoBannerByPage(id: string) {
    return this._ads.getAdvertsByPage(id).valueChanges()
      .pipe(
        map((array) => {
          return array[0];
        })
      );
    ;
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
          // console.log(data)
          this._alert.success('Product Added To Cart!');
        },
        (err) => {
          // console.log(err)
          this._alert.error('Product NOT Added To Cart!');
        },
        () => {
          // console.log('done')
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
          // console.log(data);
          this._alert.success('Product Added To Wishlist!');
        },
        (err) => {
          // console.log(err);
          this._alert.error('Product NOT Added To Wishlist!');
        },
        () => {
          // console.log('done')
          // console.log(postWishData)
        }
      )
  }  

}