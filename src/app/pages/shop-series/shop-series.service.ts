import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ShopSeriesService {
  filterParams: any;
  constructor(private http: HttpClient) { }

  getFilteredSeriesList(filterData) {
    return this.http.get(`${environment.apiPath}/series/getProductSeriesAllByCategory/${filterData.categoryId}`,).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  setFilterParams(params) {
    this.filterParams = params;
  }

  getFilterParams(): Observable<any>{
    return this.filterParams;
  }
}
