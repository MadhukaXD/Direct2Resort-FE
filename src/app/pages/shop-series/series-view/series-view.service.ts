import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeriesViewService {

  constructor(private http: HttpClient) { }

  getProductSeriesSingle(seriesId) {
    return this.http.get(`${environment.apiPath}/series/getProductSeriesSingle/${seriesId}`).pipe(
      map((data:any) => {
        return data.data;
      })
    )
  }

  getProductSeriesRefDetails(seriesId) {
    return this.http.get(`${environment.apiPath}/series/getProductSeriesRefDetails/${seriesId}`).pipe(
      map((data:any) => {
        return data.data[0];
      })
    )
  }
}
