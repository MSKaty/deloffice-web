import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Wishbox } from '../classes/wishbox';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = environment.apiUrl;

    constructor(private _http: HttpClient) { }

    // Cart Operations

    /**
     * Get Cart Contents according to logged in User
    */
    public getCartContents(): Observable<Wishbox[]> {
        const userdata = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null;
        return this._http.get<Wishbox[]>(this.apiUrl + '/order/cart').pipe(
            map(cartItems => {
                return cartItems.map((item: any) => {
                    let mainprice = item.product.puprice;
                    if (userdata) {
                        switch (userdata.utype) {
                            case 'Individual':
                                mainprice = item.product.puprice;
                                break;
                            case 'Corporate':
                                mainprice = item.product.coprice;
                                break;
                            case 'Reseller':
                                mainprice = item.product.wsprice;
                                break;
                        }
                    }
                    item.product.mainprice = mainprice;
                    return item;
                });
            })
        );
    }
    /**
     * Update quantity of item in cart
    */
    public updateQty(id: number, body: Partial<Wishbox>): Observable<any> {
        return this._http.put(this.apiUrl + '/order/cart/' + id, body);
    }
    /**
     * Add item to cart
    */
    public addToCart(body: Partial<Wishbox>): Observable<any> {
        return this._http.post(this.apiUrl + '/order/cart', body);
    }
    /**
     * Delete cart item from cart
    */
    public deleteCartItem(id: number): Observable<any> {
        return this._http.delete(this.apiUrl + '/order/cart/' + id);
    }

    // Wishlist Operations

    public getWishlistContents() {
        const userdata = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null;
        return this._http.get<any>(this.apiUrl + '/order/wishlist').pipe(
            map(wlItems => {
                return wlItems.map((item: any) => {
                    let mainprice = item.product.puprice;
                    if (userdata) {
                        switch (userdata.utype) {
                            case 'Individual':
                                mainprice = item.product.puprice;
                                break;
                            case 'Corporate':
                                mainprice = item.product.coprice;
                                break;
                            case 'Reseller':
                                mainprice = item.product.wsprice;
                                break;
                        }
                    }
                    item.product.mainprice = mainprice;
                    return item;
                });
            })
        );;
    }

    /**
     * Update quantity in item from wishlist
    */
    public updateWLQty(id, body) {
        return this._http.put(this.apiUrl + '/order/wishlist/' + id, body);
    }

    /**
     * Add item to wishlist
    */
    public addToWishlist(body) {
        return this._http.post(this.apiUrl + '/order/wishlist', body);
    }

    /**
     * Delete item from wishlist
    */
    public deleteWishlistItem(id) {
        return this._http.delete(this.apiUrl + '/order/wishlist/' + id);
    }

}
