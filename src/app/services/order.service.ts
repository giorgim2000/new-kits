import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, Subject } from 'rxjs';
import { CreateOrderDto } from '../Dto\'s/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = "http://91.239.207.195:5000";
  //url = "https://localhost:7210";
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getOrders(){

  }

  postOrder(order:CreateOrderDto){
    let header = new HttpHeaders({
      'Content-Type': "application/json"
    });
    let options = {
      headers: header
    };
    return this.http.post(this.url + "/api/Orders", order, options)
                    .pipe(map((res) =>{
                      return res;
                    }),
                    catchError((error) => {
                      console.log(error);
                      return of(error);
                    }))
  }

  putOrder(id:number, order:CreateOrderDto){

  }

  removeOrder(id:number){

  }
}
