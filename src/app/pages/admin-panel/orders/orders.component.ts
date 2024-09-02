import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CreateOrderDto, OrderDeliveryDto, OrderDto, OrderStatus, PaymentType, UpdateOrderDto } from 'src/app/Dto\'s/order';
import { CourierService } from 'src/app/services/courier.service';
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
  selectedProducts : any[] = [];
  confirmBtnDisabled = true;
  confirmBtnText : string = "შეკვეთის მიღება";
  cancelBtnDisabled = true;
  deliveryBtnDisabled = true;
  delivery : OrderDeliveryDto | undefined;
  popupText:string|undefined;
  popupVisible = false;
  deliveryPopupVisible = false;
  couriers = [];
  selectedCourier:any;

  toastType:any = 'success';
  toastMessage:any = '';
  toastVisible = false;

  addOrderPopup = false;
  productsPopupVisible = false;
  loading = false;

  constructor(private orderService:OrderService, private courierService:CourierService){}

  ngOnInit(): void {
    this.getOrders();
    this.getCouriers();
  }

  ngOnDestroy(): void {
    this.courierService.ngOnDestroy();
    this.orderService.ngOnDestroy();
  }
  
  getOrders(){
    this.orderService.getOrders().subscribe({
      next:(res : any) => this.orders = res
    });
  }

  getCouriers(){
    this.courierService.getCouriers().subscribe({
      next:(res) => this.couriers = res
    });
  }

  postOrder(order:CreateOrderDto){
    this.orderService.postOrder(order).subscribe({
      next:(res) => console.log(res),
      error:(err) => console.log(err)
    })
  }

  confirmOrder(){
    let orderStatus = this.selectedRow?.status == OrderStatus.Recieved ? OrderStatus.Confirmed : OrderStatus.Finished;
    var confirmedOrder : UpdateOrderDto = {orderId: this.selectedRow?.id, orderStatus: orderStatus};

    this.orderService.putOrder(confirmedOrder).subscribe({
      next:(res) => {
        this.getOrders();
        this.ordersGrid.instance.refresh();
      }
    })
  }

  selectionChange(e:any){
    this.selectedRow = e.selectedRowsData[0];
    if(e.selectedRowsData[0].status == 0){
      this.cancelBtnDisabled = false;
      this.confirmBtnDisabled = false;
      this.confirmBtnText = "დადასტურება";
      if(this.selectedRow?.withDelivery){
        this.deliveryBtnDisabled = false;
        if(this.selectedRow.delivery?.courierId == null){
          this.confirmBtnDisabled = true;
        }
      }else
        this.deliveryBtnDisabled = true;
    }else if(e.selectedRowsData[0].status == 1){
      this.deliveryBtnDisabled = true;
      this.cancelBtnDisabled = false;
      this.confirmBtnDisabled = false;
      this.deliveryBtnDisabled = true;
      this.confirmBtnText = "დასრულება";
    }else if(e.selectedRowsData[0].status == 2){
      this.deliveryBtnDisabled = true;
      this.cancelBtnDisabled = true;
      this.confirmBtnDisabled = true;
      this.deliveryBtnDisabled = true;
    }else if(e.selectedRowsData[0].status == 3){
      this.deliveryBtnDisabled = true;
      this.cancelBtnDisabled = true;
      this.confirmBtnDisabled = true;
      //this.confirmBtnText = "შეკვეთის აღდგენა";
      this.deliveryBtnDisabled = true;
    }
  }

  addOrderPopupVisible(){
    this.addOrderPopup = true;
  }

  closeAddOrderPopup(){
    this.addOrderPopup = false;
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

  cellPrepared(e:any){
    // console.log(e);
    // if(e.rowType == 'data' && e.columnIndex == 5){
    //   if(e.text == "Recieved")
    //     e.cellElement.style.background = "white";

    //   if(e.text.toLowerCase() == "confirmed")
    //     e.cellElement.style.background = "rgb(233, 233, 32)";

    //   if(e.text.toLowerCase() == "finished")
    //     e.cellElement.style.background = "rgb(22, 160, 22)";

    //   if(e.text.toLowerCase() == "cancelled")
    //     e.cellElement.style.background = "rgb(207, 207, 207)";
    // }

    // if(e.rowType == 'data' && e.columnIndex == 6){
    //   if(e.text == "Cash")
    //     e.displayValue = "ქეში";

    //   if(e.text == "Transfer")
    //     e.displayValue = "გადარიცხვა";

    //   if(e.text.toLowerCase() == "card")
    //     e.displayValue = "ბარათი";

    //   if(e.text.toLowerCase() == "consig")
    //     e.displayValue = "კონსიგნაცია";
    // }
  }

  goToPdf = (e:any) => {
    const url = e.row.data.invoiceUrl;
    if (url) {
      window.open(url, '_blank');
    } else {
      this.showToast('warning', 'შეკვეთა არ არის დადასტურებული!');
    }
  }

  orderProducts = (e:any) =>{
    this.getOrderProducts(e.row.data.id);
    this.productsPopupVisible = true;
  }

  getOrderProducts(id:number){
    this.orderService.getOrderProducts(id).subscribe({
      next:(res:any) => this.selectedProducts = res,
      error:(err) => console.log(err)
    });
  }

  deliveryPopup(){
    if(this.selectedRow?.delivery?.courierId != null)
      this.selectedCourier = this.selectedRow?.delivery?.courierId;

    this.deliveryPopupVisible = true;
  }

  displayCourierInfo(e:any){
    if(e)
      return `${e.firstName} ${e.lastName}`;
    else
      return '';
  }

  appendCourier(){
    if(this.selectedCourier != null){
      this.courierService.addCourierToDelivery(this.selectedRow!.delivery!.id!, this.selectedCourier).subscribe({
        next:(res) => {
          if(res){
            this.showToast('success','შეკვეთას წარმატებით დაემატა კურიერი');
            this.deliveryPopupVisible = false;
          }else
            this.showToast('warning','დაფიქსირდა შეცდომა!');
        },
        error: (err) => {
          this.showToast('warning','დაფიქსირდა შეცდომა!');
        }
      });
    }else
      this.showToast("error", "გთხოვთ აირჩიოთ კურიერი!");
  }

  deliveryPopupClosed(){
    this.selectedCourier = null;
    this.deliveryPopupVisible = false;
  }

  showToast(type:string,message:string){
    this.toastType = type;
    this.toastMessage = message;
    this.toastVisible = true;
  }

  checkOutPopupHidden(){
    this.productsPopupVisible = false;
  }

  percentCell = (e:any)=>{
    return `${e.discount}%`
  }

  priceCell = (e:any)=>{
    return e.price + "₾";
  }

  sumCell = (e:any) =>{
    if(e.discount > 0)
      return e.price * e.quantity * (1 - (e.discount / 100)) + "₾";

    return e.price * e.quantity + "₾";
  }

  popupHidden(){
    this.productsPopupVisible = false;
  }
}
