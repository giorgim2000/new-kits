import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map, takeUntil, catchError, of, Observable } from 'rxjs';
import { UrlS } from 'src/assets/config';
import { Make } from '../Dto\'s/make';
import { CreateCityDto, UpdateCityDto } from '../Dto\'s/order';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  url = UrlS.url2;
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get(id?:number){
    var reqUrl = this.url + "/api/City";
    if(id != undefined)
      reqUrl += `/${id}`;

    return this.http.get(reqUrl)
                    .pipe(map((response) => {
                      takeUntil(this.unsubscribe$);
                      return response;
                    }),
                    catchError((error) => {
                      console.log(error);
                      return of(error);
                    }));
  }

  postCity(city:CreateCityDto): Observable<any> {
    return this.http.post<any>(this.url + `/api/City`, city);
  }

  putCity(city:UpdateCityDto){
    return this.http.put<any>(this.url + `/api/City`, city);
  }

  removeCity(id:number){
    return this.http.delete(this.url + `/api/City/${id}`)
    .pipe(map((response) => {
      return response;
    }),
    catchError((error) => {
      console.log(error);
      return of(error);
    }));
  }
}
