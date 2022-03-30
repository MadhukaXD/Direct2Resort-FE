import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RfqModalService {

  constructor(private http: HttpClient) { }

  sendRfq(rfq: any) {
    return this.http.post(`${environment.apiPath}/series/createQuote`, rfq).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  getRelatedProducts(productData: any) {    
    return this.http.post(`${environment.apiPath}/shop/getRelatedProducts`, productData).pipe(
      map((data:any) => {
        return data;
      })
    )
  }
}
