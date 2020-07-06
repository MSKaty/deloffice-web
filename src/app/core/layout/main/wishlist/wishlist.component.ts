import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderService } from 'src/app/common/services/order.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  private _wishList$ = new BehaviorSubject<any[]>([]);
  public wishList$: Observable<any[]> = this._wishList$.asObservable();

  public userdata: any = JSON.parse(window.localStorage.getItem('user'));

  public WishList$;

  constructor(private _order: OrderService) { }

  ngOnInit() {
    this.WishList$ = this._order.getWishlistContents().pipe(
      tap((items: any) => {
        this._wishList$.next(items);
      })
    );
  }

  public addToCart(item) {
    let tempArray = this._wishList$.value;
    tempArray.push(item);
    this._wishList$.next(tempArray);
  }

  public updateQtyInCart(event, index) {
    let tempArray = this._wishList$.value;
    tempArray[index].quantity = event.target.value;
    this._wishList$.next(tempArray);
    this._order.updateQty(tempArray[index].wishboxid, tempArray[index]).subscribe()

  }

  public removeFromCart(index) {
    let tempArray = this._wishList$.value;
    tempArray.splice(index, 1);
    this._wishList$.next(tempArray);
  }

}
