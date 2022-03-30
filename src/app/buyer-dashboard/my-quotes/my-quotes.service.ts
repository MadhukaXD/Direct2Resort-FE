import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyQuotesService {

  constructor(private http: HttpClient) { }

  getMyQuoteList() {
    return this.http.get(`${environment.apiPath}/quote/getQuoteListBuyer`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }

  getQuoteQuoteInstancesBuyer(filter: string) {
    return this.http.post(`${environment.apiPath}/series/getQuoteQuoteInstancesBuyer`, {filter}).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }
}
