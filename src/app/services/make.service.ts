import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map, takeUntil, catchError, of, Observable } from 'rxjs';
import { Make } from '../Dto\'s/make';

@Injectable({
  providedIn: 'root'
})
export class MakeService {
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getMakes(){
    return this.http.get<Make>("https://localhost:7210/api/Makes")
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
    return this.http.post<any>(`https://localhost:7210/api/Makes`, formData);
  }

  putMake(id:number, formData:FormData){
    return this.http.put<any>(`https://localhost:7210/api/Makes/${id}`, formData);
  }

  removeMake(id:number){
    return this.http.delete(`https://localhost:7210/api/Makes/${id}`)
    .pipe(map((response) => {
      return response;
    }),
    catchError((error) => {
      console.log(error);
      return of(error);
    }));
  }
}
