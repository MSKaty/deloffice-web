import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  public login(credentials: any) {
    return this._http.post<any>(this.apiUrl + '/auth/login', credentials).pipe(
      switchMap(data => {
        if (data && data.access_token) {
          window.localStorage.setItem('token', JSON.stringify(data));
          return of(data);
        } else {
          return throwError(data);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      })
    );
  }

  public register(userdata: any) {
    return this._http.post(this.apiUrl + '/auth/register', userdata);
  }

  public getProfile() {
    return this._http.get(this.apiUrl + '/auth/profile');
  }

  public getAccount() {
    return this._http.get(this.apiUrl + '/user/account');
  }

  public updateUser(body) {
    const userdata = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null;
    return this._http.put(this.apiUrl + '/user/account/' + userdata.uid, body);
  }
 
}
