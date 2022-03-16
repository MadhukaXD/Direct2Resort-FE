import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerCompany(companyData: any) {
    return this.http.post(`${environment.apiPath}/auth/companyRegistration`, companyData).pipe(
      map ((data: any) => {
        return data;
      })
    )
  }
}
