import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogisticPartnerDashboardService {

  constructor(private http: HttpClient) { }

  getQuoteFrightForLPList() {
    return this.http.get(`${environment.apiPath}/lp/getQuoteFrightForLPList`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }
}
