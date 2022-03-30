import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopSeriesSidebarService {
  private filterParams = new BehaviorSubject(
    {
      categoryId: 0
    } 
  );
  
  currentFilter = this.filterParams.asObservable();

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get(`${environment.apiPath}/shop/getCategories`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }

  getAllSubCategories(catId) {
    return this.http.get(`${environment.apiPath}/shop/getSubCategories/${catId}`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }

  updateFilter(filter) {
    this.filterParams.next(filter);
  }
}
