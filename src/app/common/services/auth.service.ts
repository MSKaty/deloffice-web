import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private currentUserSubject : BehaviorSubject<any>;
  public currentUser : Observable<any>;

  constructor(private http: HttpClient) {

      this.currentUserSubject = new BehaviorSubject(localStorage.getItem('currentUser'));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue():Observable<any>{
    return this.currentUserSubject.value;
}
  //  public login(uname:string, pword:string): Observable<any>{
  //     return this.http.post<>(this.apiUrl + '', {uname,pword})
  //       .pipe(map(user=>{ 

  //       }))
  // }

  
  logout() {
   
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

  // public register(): Observable<any> {
  //   return this.http.post<>(this.apiUrl + '', {})
  // }

  // public profile(): Observable<any>{
  //   return this.http.get<>(this.apiUrl + '', {})
  // }
}