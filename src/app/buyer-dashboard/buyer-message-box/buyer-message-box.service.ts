import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuyerMessageBoxService {

  constructor(private http: HttpClient) { }

  getAllMsgs() {
    return this.http.get(`${environment.apiV2}/productmessage/getProductMsgs`).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  getSingleChat(uuid: string) {
    return this.http.get(`${environment.apiV2}/productmessage/getProductMsgInstances/${uuid}`).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  sendMsg(msg: any) {
    return this.http.post(`${environment.apiV2}/productmessage/sendMsg`, msg).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  setMsgSeen(msg: any) {
    return this.http.post(`${environment.apiV2}/productmessage/setMsgSeen`, msg).pipe(
      map((data:any) => {
        return data;
      })
    )
  }
}
