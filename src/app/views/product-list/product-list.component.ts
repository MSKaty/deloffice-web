import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../common/services/product.service';
import { CategoryService } from '../../common/services/category.service';
import { TitleService } from '../../common/services/title.service';

import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { OrderService } from 'src/app/common/services/order.service';
import { switchMap, tap, map } from 'rxjs/operators';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private _prodList$ = new BehaviorSubject<any[]>([]);
  public prodList$: Observable<any[]> = this._prodList$.asObservable();
  
  public userdata: any = JSON.parse(window.localStorage.getItem('user'));

  public cartList$;

  currentPage = 1;
  category$: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _prod: ProductService,
    private _cat: CategoryService,
    private _title: TitleService,
    private _order: OrderService
  ) { }

  ngOnInit() {
    this.category$ = this.get().pipe(
      map(([category, productdata]) => {
        this._title.changeTitle(category.description);
        return { category, productdata: productdata[0] };
      }),
      tap((data) => {
        console.log(data);
      })
      // tap((category) => { this._title.changeTitle(category.des1) })
    )
    this.cartList$ = this._order.getCartContents().pipe(
      tap((items: any) => {
        this._prodList$.next(items);
      })
    );
  }
  get() {
    return combineLatest(
      this._route.params,
      this._route.queryParams
    ).pipe(
      switchMap(([param, query]) => {
        if (query['p']) {
          this.currentPage = +query['p'];
        } else {
          this.currentPage = 1;
        }
        return combineLatest(
          this._cat.getCat(param['id']),
          this._prod.findAll(param['id'], this.currentPage)
        )
      })
    )
  }
  public addToCart(event,item) {
    let tempArray = this._prodList$.value;
    tempArray.push(item);
    this._prodList$.next(tempArray);
    this._order.addToCart(tempArray[item]).subscribe()
  }

  pagecount(data1) {
    return Math.ceil(data1.count / 20)
  }

  tempArray(num) {
    let baseArr = Array.from(
      Array(Math.ceil(num / 20)),
      (_, i) => i + 1
    );
    baseArr = baseArr.filter(item => {
      if (+item < +this.currentPage + 3 && +item > +this.currentPage - 3) {
        // console.log(item);
        return item;
      }
    })
    return baseArr;
  }

  isIncluded(num: number, array: number[]) {
    if (array.includes(num)) {
      return true;
    }

    return false;
  }
}
