import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderService } from 'src/app/common/services/order.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  private _prodList$ = new BehaviorSubject<any[]>([]);
  public prodList$: Observable<any[]> = this._prodList$.asObservable();

  public userdata: any = JSON.parse(window.localStorage.getItem('user'));

  public cartList$;

  constructor(
    private _fb: FormBuilder,
    private _order: OrderService
  ) { }

  ngOnInit() {
    this.cartList$ = this._order.getCartContents().pipe(
      tap((items: any) => {
        this._prodList$.next(items);
      })
    );
  }

  // Utils functions

  public addToCart(item) {
    let tempArray = this._prodList$.value;
    tempArray.push(item);
    this._prodList$.next(tempArray);
  }

  public updateQtyInCart(event, index) {
    let tempArray = this._prodList$.value;
    tempArray[index].quantity = event.target.value;
    this._prodList$.next(tempArray);
    this._order.updateQty(tempArray[index].wishboxid, tempArray[index]).subscribe()

  }

  public removeFromCart(index) {
    let tempArray = this._prodList$.value;
    tempArray.splice(index, 1);
    this._prodList$.next(tempArray);
  }

  // Getter functions

  public get purchaseTotal() {
    let tempArray = this._prodList$.value;
    return tempArray.reduce((acc, curr) => {
      return acc + (+curr.product.puprice * +curr.quantity);
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
}