import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerProductSingleService {

  constructor(private http: HttpClient) { }

  getProductByUrl(productUrl: string) {
    return this.http.get(`${environment.apiPath}/product/getProductInfoByUrlForSeller/${productUrl}`).pipe(
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
}
