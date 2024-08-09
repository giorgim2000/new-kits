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
  isloading = false;
  
  constructor(private service:StoresService){}

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.service.ngOnDestroy();
  }

  getData(){
    this.isloading = true;
    this.service.getStores().subscribe({
      next:(res : any)=>{
        this.storesDataSource = res;
        this.isloading = false;
      },
      error:(err)=>{
        console.log(err);
        this.isloading = false;
      }
    })
  }

  getRestData(storeId:number){
    this.isloading = true;
    this.service.getStoreProductsRest(storeId).subscribe({
      next:(res:any) =>{
        this.productsRestDataSource = res;
        this.isloading = false;
      },
      error:(err)=>{
        console.log(err);
        this.isloading = false;
      }
    })
  }

  showProducts = (e:any)=>{
    this.getRestData(e.row.data.id);
    this.showProductRestPopup = true;
  }

  onPopupHidden(){
    this.productsRestDataSource = [];
    this.showProductRestPopup = false;
  }
}
