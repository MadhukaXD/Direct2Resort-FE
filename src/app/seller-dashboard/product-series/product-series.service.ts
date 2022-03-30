import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductSeriesService {

  constructor(private http: HttpClient) { }
  
  getProductCategories() {
    return this.http.get(`${environment.apiPath}/seller/getProductCategories`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }

  getSubProductCategories(catId) {
    return this.http.get(`${environment.apiPath}/seller/getSubProductCategories/${catId}`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }

  getSellerProducts(catId) {
    return this.http.get(`${environment.apiPath}/seller/getProductsByCatPs/${catId}`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }

  addProductSeries(productSeries) {
    return this.http.post(`${environment.apiPath}/product/addProductSeries`, productSeries).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }

  getProductSeriesList() {
    return this.http.get(`${environment.apiPath}/seller/getProductSeriesList`).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  deleteProductSeries(seriesRefId: number) {
    return this.http.put(`${environment.apiPath}/series/deleteProductSeries`, {seriesRefId: seriesRefId}).pipe(
      map((data:any) => {
        return data;
      })
    )
  }
}
