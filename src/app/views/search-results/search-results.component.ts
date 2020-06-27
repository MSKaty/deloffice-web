import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../common/services/product.service';
import { CategoryService } from '../../common/services/category.service';
import { TitleService } from '../../common/services/title.service';

import { Observable, combineLatest } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  currentPage = 1;

  result$: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _prod: ProductService,
    private _cat: CategoryService,
    private _title: TitleService
  ) { }

  ngOnInit() {
    this.result$ = this.get();
  }

  get() {
    return this._route.queryParams.pipe(
      switchMap(query => {
        this._title.changeTitle(`Search results for: ${query['s']}`);
        return this._prod.findAll(null, this.currentPage, query['s']);
      }),
      map((data) => {
        return data[0];
      })
    )
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

}
