import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private _storage = window.localStorage.getItem('token');

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this._auth.getProfile()
      .pipe(
        map(user => {
          // console.log(user);
          return !!user;
        }),
        tap((loggedIn) => {
          if (!loggedIn) {
            this._router.navigate(['/login']);
          }
        }),
        catchError((err) => {
          this._router.navigate(['/login']);
          return of(err);
        })
      );
  }

}
