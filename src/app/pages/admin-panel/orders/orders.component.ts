import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateOrderDto } from 'src/app/Dto\'s/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders:any[]=[];
  constructor(private orderService:OrderService){}

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }
  
  getOrders(){

  }

  postOrder(order:CreateOrderDto){
    this.orderService.postOrder(order).subscribe({
      next:(res) => console.log(res),
      error:(err) => console.log(err)
    })
  }

}
