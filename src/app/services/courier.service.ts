import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, Subject } from 'rxjs';
import { CourierDto } from '../Dto\'s/courier';
import { UrlS } from 'src/assets/config';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  //url = "http://91.239.207.195:5000";
  //url = "https://localhost:7210";
  url = UrlS.url2;
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getCouriers(){
    let url = this.url + `/api/Couriers`;

    return this.http.get(url).pipe(map((response)=>{
      return response;
    }), catchError((error) => {
      console.log(error);
      return of(error);
    }));
  }

  postCourier(input:CourierDto){
    let header = new HttpHeaders({
      'Content-Type': "application/json"
    });
    let options = {
      headers: header
    };
    return this.http.post(this.url + '/api/Couriers', input, options);
  }

  putCourier(input:CourierDto){
    return this.http.put(this.url + `/api/Couriers/${input.Id}`, {input});
  }

  removeCourier(id:number){
    return this.http.delete(this.url + `/api/Couriers/${id}`);
  }

}
