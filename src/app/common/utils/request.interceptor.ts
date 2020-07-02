import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
    constructor(
        private _router: Router
    ) { }

    intercept(
        request: HttpRequest<any>, next: HttpHandler
    ): Observable<any> {
        const user = JSON.parse(window.localStorage.getItem('user'));
        const token = JSON.parse(window.localStorage.getItem('token'));

        if (token) {
            const authReq = request.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.access_token}`
                })
            });
            return next.handle(authReq).pipe(
                catchError((err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this._router.navigate(['/login']);
                        console.log(err);
                    }
                    return of(err);
                })
            );
        } else {
            return next.handle(request).pipe(
                catchError((err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this._router.navigate(['/login']);
                        console.log(err);
                    }
                    return of(err);
                })
            );
        }
    }
}
