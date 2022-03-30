import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IvysHeaderSearchService {

  constructor(private http: HttpClient) { }

  liveSearchProduct(param: string) : Observable<any>{
    return this.http.get<any>(`${environment.apiPath}/shop/liveSearchProduct/${param}`).pipe(
      catchError(err => of([]))
    )
  }
}
