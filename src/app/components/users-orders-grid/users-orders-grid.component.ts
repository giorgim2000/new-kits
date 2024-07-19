import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-users-orders-grid',
  templateUrl: './users-orders-grid.component.html',
  styleUrl: './users-orders-grid.component.scss'
})
export class UsersOrdersGridComponent {
  @Input()userId?:number;
  @Input()popupVisible!:boolean;
  @Output() closePopup = new EventEmitter<void>();
  userOrders : any[] = [];

}
