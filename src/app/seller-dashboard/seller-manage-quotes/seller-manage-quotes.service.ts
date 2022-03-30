import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerManageQuotesService {

  constructor(private http: HttpClient) { }

  getQuoteQuoteInstancesSellerQuery(filter: string) {
    return this.http.post(`${environment.apiPath}/series/getQuoteQuoteInstancesSellerQuery`, {filter}).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }
}
