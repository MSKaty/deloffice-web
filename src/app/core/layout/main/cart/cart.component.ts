import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderService } from 'src/app/common/services/order.service';
import { tap } from 'rxjs/operators';
import { AdvertService } from 'src/app/common/services/advert.service';
import { AlertService } from 'src/app/common/services/alert.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  private _prodList$ = new BehaviorSubject<any[]>([]);
  cartad$: Observable<any>;
  public prodList$: Observable<any[]> = this._prodList$.asObservable();

  public userdata: any = JSON.parse(window.localStorage.getItem('user'));

  public cartList$;

  public commentGrp: FormGroup = this.fb.group({
    commentArea:[''],
  })

  constructor(
    private _order: OrderService,
    private fb: FormBuilder,
    private _ads: AdvertService,
    private _alert: AlertService
  ) { }

  ngOnInit() {
    this.cartad$ = this.getAdvertsByPage('cart');
    this.cartList$ = this._order.getCartContents().pipe(
      tap((items: any) => {
        this._prodList$.next(items);
      })
    );
  }

  getAdvertsByPage(id: string) {
    return this._ads.getAdvertsByPage(id).valueChanges();
  }

  // Utils functions
  public updateQtyInCart(event, index) {
    let tempArray = this._prodList$.value;
    tempArray[index].quantity = event.target.value;
    this._order.updateQty(tempArray[index].wishboxid, tempArray[index]).subscribe(
      (data) => {
        console.log(data)
      },
      (err) => {
        console.log(err)
      },
      () => {
        this._prodList$.next(tempArray);
      }
    )
  }

  public removeFromCart(index) {
    let tempArray = this._prodList$.value;
    this._order.deleteCartItem(tempArray[index].wishboxid).subscribe(
      (data) => {
        console.log(data)
      },
      (err) => {
        console.log(err)
      },
      () => {
        tempArray.splice(index, 1);
        this._prodList$.next(tempArray);
      }
    )
  }

  public clearCart() {
    let tempArray = this._prodList$.value;
    tempArray = [];
    this._prodList$.next(tempArray);
  }

  // Getter functions

  public get purchaseTotal() {
    let tempArray = this._prodList$.value;
    return tempArray.reduce((acc, curr) => {
      return acc + (+curr.product.mainprice * +curr.quantity);
    }, 0);
  }

  public get deliveryFee() {
    if (this.purchaseTotal > 5000) {
      return 0;
    }
    return +this.userdata.deliveryfee;
  }

  public get orderTotalExcl() {
    return this.purchaseTotal + this.deliveryFee;
  }

  public get vatTotal() {
    return this.orderTotalExcl * .15;
  }

  public get orderTotalIncl() {
    return this.orderTotalExcl * 1.15;
  }

  public sendCartOrder(body:any){
    this._order.sendCartOrder(body).subscribe(
      (data) => {
        console.log(data);
        this._alert.success('Cart Order Sent!');
      },
      (err) => {
        console.log(err)
        this._alert.error('Cart Order NOT Sent!');
      },
      () => {
        console.log('done');
      }
    );
  }
}