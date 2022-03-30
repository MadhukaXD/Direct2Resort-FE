import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  constructor(private http: HttpClient) { }

  getUserInformation() {
    return this.http.get(`${environment.apiPath}/auth/userInformation`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }
}

