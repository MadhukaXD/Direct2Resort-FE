import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubmitedToLpService {

  constructor(private http: HttpClient) { }

  getProductQuoteInstancebyQuote(productQuoteId) {
    return this.http.get(`${environment.apiPath}/series/getProductQuoteInstancebyQuote/${productQuoteId}`).pipe(
      map((data: any) => {
        return data;
      })
    )
  }

  getQuoteProduct(quoteId: number) {
    return this.http.get(`${environment.apiPath}/quote/getQuoteProductDetailsSeller/${quoteId}`).pipe(
      map((data:any) => {
        return data.data[0];
      })
    )
  }

  getQuoteFreightData(quoteId: number) {
    return this.http.get(`${environment.apiPath}/seller/getQuoteFreightData/${quoteId}`).pipe(
      map((data:any) => {
        return data[0];
      })
    )
  }
}
