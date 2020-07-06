import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from '../classes/product';

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
    return this.http.get<any>(url).pipe(
      map((data) => {
        return data.map(dataItem => {
          dataItem.products = dataItem.products.map(prod => {
            const userdata = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null;
            let mainprice = prod.puprice;
            if (userdata) {
              switch (userdata.utype) {
                case 'Individual':
                  mainprice = prod.puprice;
                  break;
                case 'Corporate':
                  mainprice = prod.coprice;
                  break;
                case 'Reseller':
                  mainprice = prod.wsprice;
                  break;
              }
            }
            return { ...prod, mainprice }
          });
          return dataItem;
        });
      }),
      tap(console.log)
    );
  }

  public findOne(productId: string): Observable<Partial<Product>> {
    const userdata = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null;
    return this.http.get<Product>(this.apiUrl + '/product/' + productId).pipe(
      map(product => {
        let mainprice = product.puprice;
        if (userdata) {
          switch (userdata.utype) {
            case 'Individual':
              mainprice = product.puprice;
              break;
            case 'Corporate':
              mainprice = product.coprice;
              break;
            case 'Reseller':
              mainprice = product.wsprice;
              break;
          }
        }
        return { ...product, mainprice };
      })
    );
  }
}


