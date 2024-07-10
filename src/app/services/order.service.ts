import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CreateOrderDto } from '../Dto\'s/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getOrders(){

  }

  postOrder(order:CreateOrderDto){

  }

  putOrder(id:number, order:CreateOrderDto){

  }

  removeOrder(id:number){

  }
}
