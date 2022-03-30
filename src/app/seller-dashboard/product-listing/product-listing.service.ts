import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductListingService {

  constructor(private http: HttpClient) { }

  getSellerProducts(filter: string) {
    return this.http.post(`${environment.apiPath}/product/getProductListbyGeneralUser`, {filter}).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  setOutOfStock(product_id: string) {
    return this.http.put(`${environment.apiPath}/seller/updateMakeOutOfStock/${product_id}`, {}).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  setInStock(product_id: string) {
    return this.http.put(`${environment.apiPath}/seller/updateMakeInOfStock/${product_id}`, {}).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  deleteProduct(product_id: string) {
    return this.http.put(`${environment.apiPath}/seller/deleteProduct/${product_id}`, {}).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

}
