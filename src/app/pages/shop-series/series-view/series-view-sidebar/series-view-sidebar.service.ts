import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeriesViewSidebarService {

  constructor(private http: HttpClient) { }

  getCatAndSeriesList(seriesUrl: string) {
    return this.http.get(`${environment.apiPath}/series/getCatAndSeriesList/${seriesUrl}`).pipe(
      map((data:any) => {
        return data;
      })
    )
  }
}
