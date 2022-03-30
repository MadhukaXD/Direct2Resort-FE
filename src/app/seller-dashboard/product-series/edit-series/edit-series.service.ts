import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditSeriesService {

  constructor(private http: HttpClient) { }

  getProductCategories() {
    return this.http.get(`${environment.apiPath}/seller/getProductCategories`).pipe(
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

  getProductListBySeriesRef(seriesRefId: number) {
    return this.http.get(`${environment.apiPath}/seller/getProductSeriesSingle/${seriesRefId}`).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  removeProductFromSeries(productSeries: any) {    
    return this.http.post(`${environment.apiPath}/series/removeProductFromSeries`, productSeries).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  updateProductSeries(seriesData: any) {    
    return this.http.put(`${environment.apiPath}/series/updateProductSeries`, seriesData).pipe(
      map((data:any) => {
        return data;
      })
    )
  }
}
