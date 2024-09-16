import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { retry } from 'rxjs';
import { IUserOrder } from 'src/app/Dto\'s/order';

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

  status_customize(e:any){
    if(e.value == 0)
      return "მიღებული";
    
    if(e.value == 1)
      return "დადასტურებული";

    if(e.value == 2)
      return "დასრულებული";

    if(e.value == 3)
      return "გაუქმებული";

    return e.value;
  }

  paymentType_customize(e:any){
    if(e.value == 0)
      return "ნაღდი";

    if(e.value == 1)
      return "გადარიცხვა";

    if(e.value == 2)
      return "ბარათი";

    if(e.value == 3)
      return "კონსიგნაცია";

    return e.value;
  }

  sum_customize(e:any){
    return e.value + "₾";
  }

  popupShown(){
    this.getData();
  }

  popupHidden(){
    this.popupVisible = false;
    this.closePopup.emit();
  }
}
