import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order, OrderStatus, UpdateOrderDto } from 'src/app/Dto\'s/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  myOrders:Order[] = [];
  selectedOrderId : any;
  cancelBtnDisabled = true;
  toastMessage:any = '';
  toastVisible = false;
  constructor(private orderService:OrderService){}

  ngOnInit(): void {
    this.getOrders();
  }
  ngOnDestroy(): void {
    this.orderService.ngOnDestroy();
  }
  
  getOrders(){
    this.orderService.getOrders().subscribe({
      next:(res:any) => this.myOrders = res
    });
  }

  cancelOrder(){
    var orderToCancel : UpdateOrderDto = {orderId: this.selectedOrderId, orderStatus: OrderStatus.Cancelled};
    this.orderService.putOrder(orderToCancel).subscribe({
      next:(res)=>{
        this.showToast('შეკვეთა გაუქმებულია!');
        this.getOrders();
      },
      error:(err) => {
        this.showToast('შეკვეთის გაუქმება ვერ მოხერხდა!');
        this.getOrders();
      }
    })
  }

  goToPdf = (e:any) => {
    const url = e.row.data.invoiceUrl;
    if (url) {
      window.open(url, '_blank');
    } else {
      this.showToast('შეკვეთა არ არის დადასტურებული!');
    }
  }

  selectionChange(e:any){
    this.selectedOrderId = e.selectedRowsData[0].id;
    if(e.selectedRowsData[0].status == 0)
      this.cancelBtnDisabled = false;
    else
      this.cancelBtnDisabled = true;
  }

  rowPrepared(e:any){
    if(e.rowType == "data"){
      if(e.data.status == 0)
        e.rowElement.style.background = "white";

      if(e.data.status == 1)
        e.rowElement.style.background = "rgb(233, 233, 32)";

      if(e.data.status == 2)
        e.rowElement.style.background = "rgb(22, 160, 22)";

      if(e.data.status == 3)
        e.rowElement.style.background = "rgb(207, 207, 207)";
    }
  }

  showToast(message:string){
    this.toastMessage = message;
    this.toastVisible = true;
  }
}
