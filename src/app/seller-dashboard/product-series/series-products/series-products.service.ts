import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeriesProductsService {

  constructor(private http: HttpClient) { }
  
  getProductList(seriesRefId: number) {
    return this.http.get(`${environment.apiPath}/seller/getProductSeriesSingle/${seriesRefId}`).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  getProductSeriesRefDetails(seriesRefId: number) {
    return this.http.get(`${environment.apiPath}/seller/getProductSeriesRefDetails/${seriesRefId}`).pipe(
      map((data:any) => {
        return data[0];
      })
    )
  }
}
