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

  getMyQuoteList() {
    return this.http.get(`${environment.apiPath}/quote/getQuoteListCompany`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }
}
