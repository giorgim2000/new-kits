import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getCouriers(){
    let url = `https://localhost:44337/api/Couriers`;

    return this.http.get(url).pipe(map((response)=>{
      return response;
    }), catchError((error) => {
      console.log(error);
      return of(error);
    }));
  }

  postCourier(){

  }

  putCourier(){

  }

  removeCourier(){

  }

}
