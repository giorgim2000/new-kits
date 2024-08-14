import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CreateOrderDto, OrderDeliveryDto, OrderDto, OrderStatus, PaymentType, UpdateOrderDto } from 'src/app/Dto\'s/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  @ViewChild('ordersGrid') ordersGrid!: any;
  orders:OrderDto[]=[];
  selectedRow:OrderDto | undefined;
  confirmBtnDisabled = true;
  confirmBtnText : string = "შეკვეთის მიღება";
  cancelBtnDisabled = true;
  deliveryBtnDisabled = true;
  delivery : OrderDeliveryDto | undefined;
  questionPopupTxt:string|undefined;
  

  constructor(private orderService:OrderService){}

  ngOnInit(): void {
    this.getOrders();
  }

  ngOnDestroy(): void {
    
  }
  
  getOrders(){
    this.orderService.getOrders().subscribe({
      next:(res : any) => this.orders = res
    });
  }

  postOrder(order:CreateOrderDto){
    this.orderService.postOrder(order).subscribe({
      next:(res) => console.log(res),
      error:(err) => console.log(err)
    })
  }

  confirmOrder(){
    console.log(this.selectedRow);
    var confirmedOrder : UpdateOrderDto = {orderId: this.selectedRow?.id, orderStatus: OrderStatus.Pending};
    if(this.delivery != null)
      confirmedOrder.delivery = this.delivery;

    // this.orderService.putOrder(confirmedOrder).subscribe({
    //   next:(res) => this.ordersGrid.instance.refresh()
    // })
  }

  selectionChange(e:any){
    this.selectedRow = e.selectedRowsData[0];
    if(e.selectedRowsData[0].status == 0){
      this.cancelBtnDisabled = false;
      this.confirmBtnDisabled = false;
      this.confirmBtnText = "შეკვეთის მიღება";
      if(this.selectedRow?.withDelivery == true)
        this.deliveryBtnDisabled = false;
    }else if(e.selectedRowsData[0].status == 1){
      this.cancelBtnDisabled = false;
      this.confirmBtnDisabled = false;
      this.deliveryBtnDisabled = true;
      this.confirmBtnText = "დადასტურება";
    }else if(e.selectedRowsData[0].status == 2){
      this.cancelBtnDisabled = true;
      this.confirmBtnDisabled = true;
      this.deliveryBtnDisabled = true;
    }else if(e.selectedRowsData[0].status == 3){
      this.cancelBtnDisabled = true;
      this.confirmBtnDisabled = false;
      this.confirmBtnText = "შეკვეთის აღდგენა";
      this.deliveryBtnDisabled = true;
    }
  }

  rowPrepared(e:any){
    if(e.rowType == "data"){
      if(e.data.status == 0)
        e.rowElement.style.background = "rgb(207, 207, 207)";

      if(e.data.status == 1)
        e.rowElement.style.background = "rgb(233, 233, 32)";

      if(e.data.status == 2)
        e.rowElement.style.background = "rgb(22, 160, 22)";

      if(e.data.status == 3)
        e.rowElement.style.background = "rgb(248, 53, 53)";
    }
  }

  deliveryPopupVisible(){

  }
}
