import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductByUrl(productUrl: string) {
    return this.http.get(`${environment.apiPath}/product/getProductByUrl/${productUrl}`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }

  getCountryList(countryCode: string) {
    return this.http.get('assets/country_flags/country-list.js').pipe(
      map((data: any) => {
        const country = data.find(element => element.code === countryCode);        
        return country.name;
      })
    )
  }

  requestSample(sampleReq: any) {
    return this.http.post(`${environment.apiPath}/product/sendSampleReq`, sampleReq).pipe(
      map((data:any) => {
        return data;
      })
    )
  }
}
