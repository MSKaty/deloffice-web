import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = environment.apiUrl;

    constructor(private _http: HttpClient) { }

    public getCartContents() {
        return this._http.get(this.apiUrl + '/order/cart');
    }
    public updateQty(id, body) {
        return this._http.put(this.apiUrl + '/order/cart/' + id, body);
    }

    public addToCart(item:any){
        return this._http.post(this.apiUrl + '/order/cart/', item);
    }
}
