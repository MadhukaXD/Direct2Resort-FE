import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubmitedLpListService {

  constructor(private http: HttpClient) { }

  getSubmitedToShipItems() {
    return this.http.get(`${environment.apiPath}/seller/getQuotesSubmitedToLp`).pipe(
      map((data:any) => {
        return data;
      })
    )
  }
}
