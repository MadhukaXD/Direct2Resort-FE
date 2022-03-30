import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BidManagerService {

  constructor(private http: HttpClient) { }

  getQuoteFrightForLPListSingle(frightDataId: string) {
    return this.http.get(`${environment.apiPath}/lp/getQuoteFrightForLPListSingle/${frightDataId}`).pipe(
      map((data:any) => {
        return data.data[0];
      })
    )
  }

  saveLogisticPartnerBid(bidData: any) {
    return this.http.post(`${environment.apiPath}/lp/saveLogisticPartnerBid`, bidData).pipe(
      map((data:any) => {
        return data;
      })
    )
  }


  getBidsPerQuote(quoteId: number) {
    return this.http.get(`${environment.apiPath}/lp/getBidsPerQuote/${quoteId}`).pipe(
      map((data:any) => {
        return data.data[0];
      })
    )
  }
}
