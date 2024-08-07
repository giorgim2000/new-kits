import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map, takeUntil, catchError, of, Observable } from 'rxjs';
import { UrlS } from 'src/assets/config';

@Injectable({
  providedIn: 'root'
})
export class ModelByYearService {
  //url = "http://91.239.207.195:5000";
  //url = "https://localhost:7210";
  url = UrlS.url2;
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getModelsByYear(id?:number, modelId?:number, includeAll?:boolean){
    let url = this.url + "/api/ModelsByYear";
    if(id != undefined)
      url += `/${id}`;

    if(modelId != undefined)
      url += `?modelId=${modelId}`;

    if(includeAll != undefined)
      url += `&includeAll=${includeAll}`;

    return this.http.get(url)
                    .pipe(map((response) => {
                      takeUntil(this.unsubscribe$);
                      return response;
                    }),
                    catchError((error) => {
                      console.log(error);
                      return of(error);
                    }));
  }

  postModelByYear(formData: FormData): Observable<any> {
    return this.http.post<any>(this.url + `/api/ModelsByYear`, formData);
  }

  putModelByYear(id:number, formData:FormData): Observable<any>{
    return this.http.put<any>(this.url + `/api/ModelsByYear/${id}`, formData);
  }

  removeModelByYear(id:number){
    return this.http.delete(this.url + `/api/ModelsByYear/${id}`)
    .pipe(map((response) => {
      return response;
    }),
    catchError((error) => {
      console.log(error);
      return of(error);
    }));
  }
}
