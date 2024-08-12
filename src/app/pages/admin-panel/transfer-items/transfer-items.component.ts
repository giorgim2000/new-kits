import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrItemsService } from 'src/app/services/tr-items.service';

@Component({
  selector: 'app-transfer-items',
  templateUrl: './transfer-items.component.html',
  styleUrl: './transfer-items.component.scss'
})
export class TransferItemsComponent implements OnInit, OnDestroy{
  trItems = [];
  fromDate : Date | undefined;
  toDate : Date | undefined;
  completed? : boolean;
  notCompleted? : boolean;
  orderId?:number;
  storeId?:number;
  stores = [];


  constructor(private trService:TrItemsService){}

  ngOnInit(): void {
    this.getTrItems();
  }
  ngOnDestroy(): void {
    this.trService.ngOnDestroy();
  }

  getTrItems(){
    this.trService.getItems({fromDate: this.fromDate, toDate: this.toDate, completed: this.completed, notCompleted: this.notCompleted, orderId: this.orderId, storeId: this.storeId})
                  .subscribe({next:(res:any) => this.trItems = res, error:(err) => console.log(err)});
  }

  confirmStatus(){
    
  }

  remove(e:any){

  }
}
