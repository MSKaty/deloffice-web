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

  private currentUserSubject : BehaviorSubject<user>;
  public currentUser : Observable<user>;
  
  constructor(private http:HttpClient) { 
    
  }



  login(uname:string, pword:string): Observable<any>{
      return this.http.post<user>(this.apiUrl + '', {uname,pword})
        .pipe(map(user=>{ 

          if(){
            localStorage.setItem()
          }

        }))
  }

  public register(): Observable<any>{
      return
  }
}
