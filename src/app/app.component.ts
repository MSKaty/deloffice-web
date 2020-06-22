import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { TitleService } from './common/services/title.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'deloffice';
  title$: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _title: TitleService
  ) {
    this.title$ = this.setTitle();
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
