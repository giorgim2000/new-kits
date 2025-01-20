import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { retry } from 'rxjs';
import { AddOrderColors, IUserOrder, OrderPaymentTypeTransformation, TransformOrderStatus } from 'src/app/Dto\'s/order';

@Component({
  selector: 'app-users-orders-grid',
  templateUrl: './users-orders-grid.component.html',
  styleUrl: './users-orders-grid.component.scss'
})
export class UsersOrdersGridComponent implements OnInit, OnDestroy {
  @Input()userId?:number;
  @Input()popupVisible!:boolean;
  @Output() closePopup = new EventEmitter<void>();
  @Input()userOrders?: IUserOrder[];

  constructor(){}

  ngOnInit(): void {
    if(this.userOrders == null)
      this.getData();
  }

  ngOnDestroy(): void {
    
  }

  getData(){

  }

  rowPrepared(e:any){
    AddOrderColors(e);
  }

  status_customize(e:any){
    return TransformOrderStatus(e);
  }

  paymentType_customize(e:any){
    return OrderPaymentTypeTransformation(e);
  }

  sum_customize(e:any){
    return `${e.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}₾`;
  }

  popupShown(){
    this.getData();
  }

  popupHidden(){
    this.popupVisible = false;
    this.closePopup.emit();
  }
}
