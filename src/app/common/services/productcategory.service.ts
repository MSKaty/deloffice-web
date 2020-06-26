import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
                
@Injectable({
  providedIn: 'root'
})
export class ProductcategoryService {

  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) {}

    public catfind(catId:string){
      return this.http.get(this.apiUrl + '/product/' + catId);
    }

  }

