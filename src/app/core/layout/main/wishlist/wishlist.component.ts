import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderService } from 'src/app/common/services/order.service';
import { tap } from 'rxjs/operators';
import { AlertService } from 'src/app/common/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  private _wishList$ = new BehaviorSubject<any[]>([]);
  public wishList$: Observable<any[]> = this._wishList$.asObservable();

  private _selectedItems = [];

  public userdata: any = JSON.parse(window.localStorage.getItem('user'));

  public WishList$;

  constructor(
    private _order: OrderService,
    private _alert: AlertService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.WishList$ = this._order.getWishlistContents().pipe(
      tap((items: any) => {
        this._wishList$.next(items);
        // console.log(items);
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
          // console.log(data);
          this._alert.success('Wishlist Product added To Cart');
        },
        (err) => {
          // console.log(err);
          this._alert.error('Wishlist Product NOT added To Cart!');
        },
        () => {
          // console.log('done')
        }
      )
    //delete wishlist item after adding to cart
    let tempArray = this._wishList$.value;
    this._order.deleteWishlistItem(tempArray[i].wishlistId).subscribe(
      (data) => {
        // console.log(data)
      },
      (err) => {
        // console.log(err)
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
        // console.log(data);
        this._alert.success('Wishlist Product has been Updated');
      },
      (err) => {
        // console.log(err)
        this._alert.error('Wishlist Product has NOT been Updated!');
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
        // console.log(data);
        this._alert.success('Wishlist Product Removed');
      },
      (err) => {
        // console.log(err)
        this._alert.error('Wishlist Product NOT Removed!');
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
    this._alert.success('Wishlist Has been CLEARED!');
  }

  public removeSelected() {
    let tempArray = this._wishList$.value;
  }


  // Selective modification on wishlist
  public addToArray(item) {
    const index = this.findItemInArray(item.wishlistId);
    if (index == -1) {
      this._selectedItems.push(item.wishlistId);
    } else {
      this._selectedItems.splice(index, 1);
    }
    // console.log(this._selectedItems);
  }

  public findItemInArray(wishlistId) {
    return this._selectedItems.findIndex((id) => {
      return id == wishlistId;
    })
  }

  public clearArray() {
    this._selectedItems = [];
  }

  public addAllItems(array: any[]) {
    this._selectedItems = []; //empty selected item array
    array.forEach(item => {
      this._selectedItems.push(item.wishlistId);
    })
    this._order.batchAddToCart(this._selectedItems).subscribe(
      (data) => {
        // console.log(data);
        this._alert.success('All Wishlist Items Added to Cart');
      },
      (err) => {
        // console.log(err)
        this._alert.error('All Wishlist Items NOT Added to Cart!');
      },
      () => {
        this._selectedItems = [];
      }
    );
    this._router.navigate(['/cart'])
  }

  public selectAll() {
    var container = document.querySelector(".cart_info");
    var matches = container.querySelectorAll("td > .custom-checkbox");

    // matches.forEach(function () {
    //   setAttribute(matches, checked);  
    // });
    //matches.attr('checked', 'true');

  }

}
