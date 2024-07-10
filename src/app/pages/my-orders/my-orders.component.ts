import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from 'src/app/Dto\'s/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  myOrders:Order[] = [];
  constructor(private orderService:OrderService){}

  ngOnInit(): void {
    this.getOrders();
  }
  ngOnDestroy(): void {
    this.orderService.ngOnDestroy();
  }
  
  getOrders(){

  }
}
