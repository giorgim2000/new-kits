import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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

  popupShown(){
    this.getData();
  }

  popupHidden(){
    this.popupVisible = false;
    this.closePopup.emit();
  }
}
