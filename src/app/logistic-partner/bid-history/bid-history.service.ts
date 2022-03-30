import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BidHistoryService {

  constructor(private http: HttpClient) { }

  getBidHistory() {
    return this.http.get(`${environment.apiPath}/lp/bidHistory`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }
}
