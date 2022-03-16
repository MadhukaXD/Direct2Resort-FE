import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SellerQuoteManagementService {

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

  getQuoteInstanceDetails(quoteId: number) {
    return this.http.get(`${environment.apiPath}/quote/getQuoteInstanceDetails/${quoteId}`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }


  getLastQuoteInstanceId(quoteId: number) {
    return this.http.get(`${environment.apiPath}/quote/getLastQuoteInstanceId/${quoteId}`).pipe(
      map((data:any) => {
        return data.data[0];
      })
    )
  }

  sendMsgToSeller(msgObj) {
    return this.http.put(`${environment.apiPath}/quote/sellerSendOffer`, msgObj).pipe(
      map((data:any) => {
        return data;
      })
    )
  }
}
