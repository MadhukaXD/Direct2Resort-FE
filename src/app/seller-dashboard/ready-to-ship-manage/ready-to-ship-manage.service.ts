import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReadyToShipManageService {

  constructor(private http: HttpClient) { }

  getQuote(quoteId: number) {
    return this.http.get(`${environment.apiPath}/quote/getQuoteSeller/${quoteId}`).pipe(
      map((data:any) => {
        return data.data[0];
      })
    )
  }

  getQuoteProduct(quoteId: number) {
    return this.http.get(`${environment.apiPath}/quote/getQuoteProductDetailsSeller/${quoteId}`).pipe(
      map((data:any) => {
        const productSingleImg = data.data[0].product_imgs.split(',')[0];
        data.data[0].product_single_img = productSingleImg;
        return data.data[0];
      })
    )
  }

  saveQuoteFreightForward(quoteShip: any) {
    return this.http.post(`${environment.apiPath}/seller/saveQuoteFreightForward`, quoteShip).pipe(
      map((data:any) => {
        return data
      })
    )
  }
}
