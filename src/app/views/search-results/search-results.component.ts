import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../common/services/product.service';
import { CategoryService } from '../../common/services/category.service';
import { TitleService } from '../../common/services/title.service';

import { OrderService } from 'src/app/common/services/order.service';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  public userdata: any = JSON.parse(window.localStorage.getItem('user'));

  public cartList$;

  currentPage = 1;
  searchQuery = null;

  result$: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _prod: ProductService,
    private _cat: CategoryService,
    private _title: TitleService,
    private _order: OrderService
  ) { }

  ngOnInit() {
    this.result$ = this.get();
  }

  get() {
    return this._route.queryParams.pipe(
      switchMap(query => {
        this._title.changeTitle(`Search results for: ${query['s']}`);
        const page = query['p'] ? query['p'] : 1;
        this.currentPage = page;
        this.searchQuery = query['s'];
        return this._prod.findAll(null, page, query['s']);
      }),
      map((data) => {
        return data[0];
      })
    )
  }
  pagecount(result) {
    return Math.ceil(result.count / 20)
  }

  tempArray(num) {
    const baseArr = Array.from(
      Array(Math.ceil(num / 20)),
      (_, i) => i + 1
    );
    return baseArr.filter(item => {
      if (item < this.currentPage + 3 || item > this.currentPage - 3) {
        return item;
      }
    })
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
        },
        (err) => {
          console.log(err)
        },
        () => {
          console.log('done')
        }
      )
  }
}
