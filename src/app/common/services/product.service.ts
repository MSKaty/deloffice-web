import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public findAll(category?: any, page = 1, keyword?: string): Observable<any> {
    let url = this.apiUrl + '/product?p=' + page;

    if (category) {
      url = url + '&c=' + category
    }

    if (keyword) {
      url = url + '&s=' + keyword;
    }
    return this.http.get(url);
  }

  public findOne(productId: string): Observable<any> {
    return this.http.get(this.apiUrl + '/product/' + productId);
  }
}


