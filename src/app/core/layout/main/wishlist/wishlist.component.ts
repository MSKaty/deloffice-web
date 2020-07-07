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

  constructor(
    private _order: OrderService
  ) { }

  ngOnInit() {
    this.WishList$ = this._order.getWishlistContents().pipe(
      tap((items: any) => {
        this._wishList$.next(items);
        console.log(items);
      })
    );
  }

  public addToCart(item, qty, i) {
    const postData = {
      cusid: this.userdata.uid,
      depid: 0,
      level: '',
      proid: item.product.id,
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
    //delete wishlist item after adding to cart
    let tempArray = this._wishList$.value;
    this._order.deleteWishlistItem(tempArray[i].wishlistId).subscribe(
      (data) => {
        console.log(data)
      },
      (err) => {
        console.log(err)
      },
      () => {
        tempArray.splice(item, 1);
        this._wishList$.next(tempArray);
      }
    )
  }

  public updateQtyInWishlist(event, index) {
    let tempArray = this._wishList$.value;
    tempArray[index].quantity = event.target.value;
    this._order.updateQty(tempArray[index].wishlistId, tempArray[index]).subscribe(
      (data) => {
        console.log(data)
      },
      (err) => {
        console.log(err)
      },
      () => {
        this._wishList$.next(tempArray);
      }
    )

  }

  public removeFromWishlist(index) {
    let tempArray = this._wishList$.value;
    this._order.deleteWishlistItem(tempArray[index].wishlistId).subscribe(
      (data) => {
        console.log(data)
      },
      (err) => {
        console.log(err)
      },
      () => {
        tempArray.splice(index, 1);
        this._wishList$.next(tempArray);
      }
    )
  }
  ///clear wishlist items
  public clearWish() {
    let tempArray = this._wishList$.value;
    tempArray = [];
    this._wishList$.next(tempArray);
  }

  public addSelected() {

  }

  public removeSelected() {

  }

}
