import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryService } from '../../../../common/services/category.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/common/services/alert.service';
import { PlatformService } from 'src/app/common/services/platform.service';
import { OrderService } from 'src/app/common/services/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit { 
  public userdata = null;
  category$: Observable<any>;
  searchKeyword: string;

  userAccount$: Observable<any>;

  public cartList$;
  private _prodList$ = new BehaviorSubject<any[]>([]);
  public prodList$: Observable<any[]> = this._prodList$.asObservable();

  constructor(
    private _cat: CategoryService,
    private _router: Router,
    private user: AuthService,
    private _route: ActivatedRoute,
    private _alert: AlertService,
    private _platform: PlatformService,
    private _order: OrderService,

  ) { }
  ngOnInit() {
    this.category$ = this._cat.getTree();
    this.checkUserdata();


    this.userAccount$ = this.get().pipe(
      tap((data) => { 
        // console.log(data) 
      })
    )

    ////cart
    this.cartList$ = this._order.getCartContents().pipe(
      tap((items: any) => {
        this._prodList$.next(items);
      })
    );

  }

  get() {
    return this._route.params.pipe(
      switchMap(param => {
        return this.user.getAccount();
      })
    )
  }

  search() {
    this._router.navigate(['/search'], { queryParams: { s: this.searchKeyword } })
  }

  checkUserdata() {
    if (this._platform.isBrowser) {
      this.userdata = JSON.parse(window.localStorage.getItem('user'))
      setInterval(() => {
        this.userdata = JSON.parse(window.localStorage.getItem('user'))
      }, 5000);
    }
  }

  logOut() {
    ///clear user token
    localStorage.clear();
    window.location.reload();
  }

  ///modal cart header
  // Utils functions
  public updateQtyInCart(event, index) {
    let tempArray = this._prodList$.value;
    tempArray[index].quantity = event.target.value;
    this._order.updateQty(tempArray[index].wishboxid, tempArray[index]).subscribe(
      (data) => {
        // console.log(data)
      },
      (err) => {
        // console.log(err)
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
        // console.log(data)
      },
      (err) => {
        // console.log(err)
      },
      () => {
        tempArray.splice(index, 1);
        this._prodList$.next(tempArray);
      }
    )
  }

  // Getter functions
  public get purchaseTotal() {
    let tempArray = this._prodList$.value;
    return tempArray.reduce((acc, curr) => {
      return acc + (+curr.product.mainprice * +curr.quantity);
    }, 0);
  }

}
