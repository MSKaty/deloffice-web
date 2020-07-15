import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
