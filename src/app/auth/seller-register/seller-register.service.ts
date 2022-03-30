import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerRegisterService {

  constructor(private http: HttpClient) { }

  registerCompany(companyData: any) {
    return this.http.post(`${environment.apiPath}/auth/companyRegistration`, companyData).pipe(
      map ((data: any) => {
        return data;
      })
    )
  }

  getCountryList() {
    return this.http.get(`assets/countryList.mock.json`);
  }
}
