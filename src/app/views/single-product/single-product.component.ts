import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../common/services/product.service';
import { CategoryService } from '../../common/services/category.service';
import { TitleService } from '../../common/services/title.service';

import { Observable, combineLatest, of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { OrderService } from '../../common/services/order.service';
import { AlertService } from 'src/app/common/services/alert.service';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  private _album: any[] = [];
  product$: Observable<any>;
  category$: Observable<any>;
  public userdata: any = JSON.parse(window.localStorage.getItem('user'));

  prevCount: number = 1;
  nextCount: number = 4;

  constructor(
    private _route: ActivatedRoute,
    private _prod: ProductService,
    private _cat: CategoryService,
    private _title: TitleService,
    private _order: OrderService,
    private _alert: AlertService,
    private _lightbox: Lightbox
  ) { }

  //lightbox functions
  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._album, index, {
      wrapAround: true,
      disableScrolling: true,
      centerVertically: true,
      showZoom: true,
      fitImageInViewPort: true
    });
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  ngOnInit() {
    this.product$ = this.get().pipe(
      tap((product) => {
        this._title.changeTitle(product.des1);
        for (const img of product.prod_images) {
          this._album.push({
            src: 'https://api.deloffice.mu/images/product/' + img.imgid,
            caption: '',
            thumb: 'https://api.deloffice.mu/images/product/' + img.imgid
          });
        }
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
      }),
      switchMap(productdata => {
        const catData = this._cat.getCat(productdata.category2)
        return combineLatest(of(productdata), catData)
      }),
      map(([productdata, catData]) => {
        const { categoryImg } = catData;
        return { ...productdata, categoryImg }
      }),
      // tap(console.log)
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

    if (this.userdata != null) {
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
            // console.log('done');
          }
        )
    }

    else {
      return;
    }
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
