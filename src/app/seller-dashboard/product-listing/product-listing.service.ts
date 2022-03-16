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

  getSellerProducts() {
    return this.http.get(`${environment.apiPath}/product/getProductListbyGeneralUser`).pipe(
      map((data:any) => {
        return data;
      })
    )
  }
}
