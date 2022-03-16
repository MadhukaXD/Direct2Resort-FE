import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  constructor(private http: HttpClient) { }

  

  imgUpload(imgObj) {   
    const payload = new FormData();
    // payload.append('imageFile', imgObj[0]);

    for(let i =0; i < imgObj.length; i++){
      payload.append("imageFile", imgObj[i], imgObj[i]['name']);
    }
    return this.http.post(`${environment.apiPath}/uploader/saveImage`, payload).pipe(
      map((data:any) => {
        return data;
      })
    )
    
  }
  
  getProductCategories() {
    return this.http.get(`${environment.apiPath}/product/getProductCategories`).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  getSubProductCategories(catId) {
    return this.http.get(`${environment.apiPath}/product/getSubProductCategoriesByCategory/${catId}`).pipe(
      map((data:any) => {
        return data;
      })
    )
  }

  getSubProductSpecifications(subCatId) {
    return this.http.get(`${environment.apiPath}/product/getProductSpecifiAttrs/${subCatId}`).pipe(
      map((data:any) => {
        data.data.forEach(spec => {
          spec.value = '';
        });
        return data;
      })
    )
  }

  getCountryList() {
    return this.http.get(`${environment.apiPath}/util/getCountryList`);
  }

  getUnitsList() {
    return this.http.get(`${environment.apiPath}/util/getUnitsList`);
  }

  addProduct(product) {
    return this.http.post(`${environment.apiPath}/product/addProduct`, product).pipe(
      map((data:any) => {
        return data;
      })
    )
  }
}
