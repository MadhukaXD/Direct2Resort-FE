import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IvysHeaderService {

  constructor(private http: HttpClient) { }

  getCategoryList() {
    return this.http.get(`${environment.apiPath}/shop/getCategories`).pipe(
      map((data:any) => {
        data.data.push({
          category_slug: "sustainable-products",
          deleted: 0,
          product_cat_desc: "this is a test",
          product_cat_id: -1,
          product_cat_img: "cat-bar.svg",
          product_cat_name: "Sustainable Products",
          is_sustainable: true
        });
        return data.data;
      })
    )
  }
}
