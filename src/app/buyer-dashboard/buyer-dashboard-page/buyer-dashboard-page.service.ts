import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuyerDashboardPageService {

  constructor(private http: HttpClient) { }

  getLpSubmitedQuotes() {
    return this.http.get(`${environment.apiPath}/buyer/getLpSubmitedQuotes`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }

  confirmLsr(data: any) {
    return this.http.post(`${environment.apiPath}/buyer/confirmLsr`, data).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }
}
