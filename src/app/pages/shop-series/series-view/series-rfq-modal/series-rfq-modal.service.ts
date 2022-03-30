import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriesRfqModalService {
  private cartSubmited = new BehaviorSubject({
    status: false
  });
  cartStatus = this.cartSubmited.asObservable();

  constructor(private http: HttpClient) { }

  createQuote(quote: any) {
    return this.http.post(`${environment.apiPath}/series/createQuote`, quote).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  rfqStatus(status: any) {
    this.cartSubmited.next(status);
  }

  getRelatedProducts(productData: any) {    
    return this.http.post(`${environment.apiPath}/shop/getRelatedProducts`, productData).pipe(
      map((data:any) => {
        return data;
      })
    )
  }
}
