import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from 'devextreme/data';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss'
})
export class StoresComponent implements OnInit, OnDestroy {
  storesDataSource : Store[]= [];
  productsRestDataSource : any[]=[];
  showProductRestPopup : boolean = false;
  
  constructor(private service:StoresService){}

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.service.ngOnDestroy();
  }

  getData(){
    this.service.getStores().subscribe({
      next:(res : any)=>{
        this.storesDataSource = res.stores;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }



  showProducts = (e:any)=>{
    this.showProductRestPopup = true;
  }

  onPopupHidden(){
    this.showProductRestPopup = false;
  }
}
