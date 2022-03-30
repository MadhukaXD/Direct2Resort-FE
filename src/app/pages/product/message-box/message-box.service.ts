import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {

  constructor(private http: HttpClient) { }

  sendMsg(msg: any) {
    return this.http.post(`${environment.apiV2}/productmessage/buyerSendMsg`, msg).pipe(
      map((data:any) => {
        return data;
      })
    )
  }
}
