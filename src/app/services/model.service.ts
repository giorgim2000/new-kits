import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  url = "http://91.239.207.195:5000";
  //url = "https://localhost:7210";
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getModels(id?:number, makeId?:number, includeAll?:boolean){
    let url = this.url + `/api/Models`;
    if(id != null)
      url += `/${id}`;

    if(makeId != null)
      url += `?makeId=${makeId}`;

    if(includeAll != null)
      url += `&includeAll=${true}`;

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

  postModel(formData: FormData): Observable<any> {
    return this.http.post<any>(this.url + `/api/Models`, formData);
  }

  putModel(id:number, formData:FormData): Observable<any>{
    return this.http.put<any>(this.url + `/api/Models/${id}`, formData);
  }

  removeModel(id:number){
    return this.http.delete(this.url + `/api/Models/${id}`)
    .pipe(map((response) => {
      return response;
    }),
    catchError((error) => {
      console.log(error);
      return of(error);
    }));
  }
}
