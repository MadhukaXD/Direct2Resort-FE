import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReadyToShipService {

  constructor(private http: HttpClient) { }

  showReadyToShipPerSellerQuery() {
    return this.http.get(`${environment.apiPath}/series/showReadyToShipPerSellerQuery`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }
}
