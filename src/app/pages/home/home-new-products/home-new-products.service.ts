import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeNewProductsService {

  constructor(private http: HttpClient) { }

  getNewProducts() {
    return this.http.get(`${environment.apiPath}/product/getNewProducts`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }
}
