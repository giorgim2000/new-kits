import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrItemsService } from 'src/app/services/tr-items.service';

@Component({
  selector: 'app-transfer-items',
  templateUrl: './transfer-items.component.html',
  styleUrl: './transfer-items.component.scss'
})
export class TransferItemsComponent implements OnInit, OnDestroy{
  trItems = [];

  constructor(private trService:TrItemsService){}

  ngOnInit(): void {
    this.getTrItems();
  }
  ngOnDestroy(): void {
    this.trService.ngOnDestroy();
  }

  getTrItems(){

  }

  remove(e:any){

  }
}
