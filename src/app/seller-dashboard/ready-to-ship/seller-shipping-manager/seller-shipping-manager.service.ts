import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerShippingManagerService {

  constructor(private http: HttpClient) { }

  getProductQuoteInstancebyQuote(quote_uuid) {
    return this.http.get(`${environment.apiPath}/series/getProductQuoteInstancebyQuote/${quote_uuid}`).pipe(
      map((data: any) => {
        if(data.data.quoteFreightData) {
          data.data.quoteFreightData[0].boxTypeData = JSON.parse(data.data.quoteFreightData[0].boxTypeData);
        }
        console.log(data);
        
        return data;
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
