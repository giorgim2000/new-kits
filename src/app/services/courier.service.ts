import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, Subject } from 'rxjs';
import { CourierDto } from '../Dto\'s/courier';

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
    let url = `http://91.239.207.195:5000/api/Couriers`;

    return this.http.get(url).pipe(map((response)=>{
      return response;
    }), catchError((error) => {
      console.log(error);
      return of(error);
    }));
  }

  postCourier(input:CourierDto){
    return this.http.post('http://91.239.207.195:5000/api/Couriers', {input});
  }

  putCourier(id:number, input:CourierDto){
    return this.http.put(`http://91.239.207.195:5000/api/Couriers/${id}`, {input});
  }

  removeCourier(id:number){
    return this.http.delete(`http://91.239.207.195:5000/api/Couriers/${id}`);
  }

}
