import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, Subject } from 'rxjs';
import { CreateOrderDto, UpdateOrderDto } from '../Dto\'s/order';
import { UrlS } from 'src/assets/config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //url = "http://91.239.207.195:5000";
  //url = "https://localhost:7210";
  url = UrlS.url2;
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient){}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getOrders(){
    return this.http.get(this.url + "/api/Orders").pipe(map((res) => {
      return res;
    }))
  }

  getOrderProducts(id:number){
    return this.http.get(this.url + `/api/Orders/GetOrderProducts/${id}`);
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

  putOrder(order:UpdateOrderDto){
    let header = new HttpHeaders({
      'Content-Type': "application/json"
    });
    let options = {
      headers: header
    };

    return this.http.put(this.url + "/api/Orders", order, options)
                    .pipe(map((res) =>{
                      return res;
                    }),
                    catchError((error) => {
                      console.log(error);
                      return of(error);
                    }))
  }

  removeOrder(id:number){
    return this.http.delete(this.url + `/api/Orders/${id}`);
  }
}

export interface IOrderResponse{
  ObjectData?:string;
  ErrorMessage?:string;
}
