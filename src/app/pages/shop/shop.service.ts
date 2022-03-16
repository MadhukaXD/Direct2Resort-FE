import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  getAllProduct() {
    return this.http.get(`${environment.apiPath}/product/getAllProductList`).pipe(
      map((data:any) => {
        return data;
      })
    )
  }
}
