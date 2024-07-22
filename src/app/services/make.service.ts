import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map, takeUntil, catchError, of, Observable } from 'rxjs';
import { Make } from '../Dto\'s/make';

@Injectable({
  providedIn: 'root'
})
export class MakeService {
  url = "http://91.239.207.195:5000";
  //url = "https://localhost:7210";
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getMakes(){
    return this.http.get<Make>(this.url + "/api/Makes")
                    .pipe(map((response) => {
                      takeUntil(this.unsubscribe$);
                      return response;
                    }),
                    catchError((error) => {
                      console.log(error);
                      return of(error);
                    }));
  }

  postMake(formData: FormData): Observable<any> {
    console.log(formData);
    return this.http.post<any>(this.url + `/api/Makes`, formData);
  }

  putMake(id:number, formData:FormData){
    return this.http.put<any>(this.url + `/api/Makes/${id}`, formData);
  }

  removeMake(id:number){
    return this.http.delete(this.url + `/api/Makes/${id}`)
    .pipe(map((response) => {
      return response;
    }),
    catchError((error) => {
      console.log(error);
      return of(error);
    }));
  }
}
