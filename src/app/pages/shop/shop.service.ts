import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  filterParams: any;
  constructor(private http: HttpClient) { }

  getFilteredProducts(filterData) {
    return this.http.post(`${environment.apiPath}/shop/filterProducts`, filterData).pipe(
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
