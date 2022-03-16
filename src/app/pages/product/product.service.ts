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
}
