import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap, tap, delay } from 'rxjs/operators';
import { TitleService } from './common/services/title.service';
import { Observable } from 'rxjs';
import { LoadingService } from './common/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'deloffice';
  title$: Observable<any>;
  loading: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _title: TitleService,
    private _loading: LoadingService
  ) {
    this.title$ = this.setTitle();
  }

  ngOnInit() {
    this.listenToLoading();
  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  setTitle() {
    return this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this._route),
      map((route) => {
        while (route.firstChild) route = route.firstChild;

        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
      tap((event) => {
        if (event['title']) {
          this._title.changeTitle(event['title'])
        } else {
          this._title.changeTitle('')
        }
      })

    )
  }
}
