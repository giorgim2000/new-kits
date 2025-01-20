import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { ValidationCallbackData } from 'devextreme/common';
import { ModelByYear } from 'src/app/Dto\'s/modelByYear';
import { CreateProduct, Product, ProductModel } from 'src/app/Dto\'s/product';
import { ModelByYearService } from 'src/app/services/model-by-year.service';
import { ProductsService } from 'src/app/services/products.service';
import { sendRequest } from '../../auth-form/create-account/create-account.component';
import { firstValueFrom, Observable } from 'rxjs';



@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrl: './product-panel.component.scss'
})
export class ProductPanelComponent implements OnInit, OnDestroy {
  @ViewChild(DxDataGridComponent, { static: false }) productGrid!: DxDataGridComponent;
  products:Product[]=[];
  productModels:ModelByYear[]=[];
  selectedProductId : number | undefined;
  productModelPopupVisible = false;
  imagesVisible = false;
  loading=false;
  warningPopupVisible = false;

  productName!:string;
  description!:string;
  finaProductName!:string;
  finaCode!:string;
  // barCode!:string;
  // active:boolean = true;
  // retailPrice!:number;
  // retailDiscount!:number;
  // semiWholeSalePrice!:number;
  // semiWholeSaleDiscount!:number;
  // wholeSalePrice!:number;
  // wholeSaleDiscount!:number;
  // warranty!:number;
  // comingSoon!:boolean;


  constructor(private productService:ProductsService, private modelByYearService:ModelByYearService){}

  ngOnDestroy(): void {
    this.productService.ngOnDestroy();
    this.modelByYearService.ngOnDestroy();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.loading = true;
    this.productService.getProducts(true).subscribe({
      next:(res)=>{
        this.products = res;
        this.productGrid.instance.refresh();
        this.loading = false;
      },
      error:(err)=>this.loading = false
    })
  }

  addPercentToNum(e:any){
    if(e.rowType == "data" && (e.columnIndex == 7 || e.columnIndex == 5 || e.columnIndex == 3))
      return `${e.value}%`;

    return e.value;
  }

  editStart(e:any){
    this.description = e.data.description;
    this.finaProductName = e.data.finaProductName;
    this.finaCode = e.data.finaCode;
    this.productName = e.data.productName;
  }

  onChangesSaved(e:any){
    if(e.changes.length > 0 && e.changes[0].type === 'insert'){
      var product : CreateProduct = {ProductName:this.productName, description:e.changes[0].data.description, retailPrice:e.changes[0].data.retailPrice,
        retailDiscount:e.changes[0].data.retailDiscount, semiWholeSalePrice: e.changes[0].data.semiWholeSalePrice, semiWholeSaleDiscount:e.changes[0].data.semiWholeSaleDiscount,
        wholeSalePrice: e.changes[0].data.wholeSalePrice, wholeSaleDiscount: e.changes[0].data.wholeSaleDiscount, warranty: e.changes[0].data.warranty,
        comingSoon: e.changes[0].data.comingSoon, active: e.changes[0].data.active, FinaCode: e.changes[0].data.finaCode, Barcode: e.changes[0].data.barcode,finaProductName: this.finaProductName
      };
      this.productService.createProduct(product).subscribe({
        next:(res) => this.getProducts(),
        error:(err)=>console.log(err)
      });
    }

    if(e.changes.length > 0 && e.changes[0].type === 'update' && e.changes[0].data != undefined){
      var editedProduct : CreateProduct = {ProductName:this.productName, description: this.description, retailPrice:e.changes[0].data.retailPrice,
        retailDiscount:e.changes[0].data.retailDiscount, semiWholeSalePrice: e.changes[0].data.semiWholeSalePrice, semiWholeSaleDiscount:e.changes[0].data.semiWholeSaleDiscount,
        wholeSalePrice: e.changes[0].data.wholeSalePrice, wholeSaleDiscount: e.changes[0].data.wholeSaleDiscount, warranty: e.changes[0].data.warranty,
        comingSoon: e.changes[0].data.comingSoon, active: e.changes[0].data.active, FinaCode: this.finaCode, Barcode: e.changes[0].data.barcode, finaProductName: this.finaProductName
      };
      this.productService.updateProduct(e.changes[0].data.id, editedProduct).subscribe({
      next:(res) => this.getProducts(),
      error:(err)=>console.log(err)
    });
    }
  }

  onEditPopupHidden = (e:any) =>{
    this.description = "";
    this.finaCode = "";
    this.finaProductName = "";
    this.productName = "";
  }

  removeProduct(e:any){
    this.productService.removeProduct(e.key).subscribe({
      next:(res) => this.productGrid.instance.refresh(),
      error:(err)=>console.log(err)
    });
  }

  onEditorPrep(e:any){
    // if(!e.row.isNewRow && e.row.isEditing){
    // }
  }

  showModels = (e:any)=>{
    this.selectedProductId = e.row.data.id;
    this.productModelPopupVisible = true;
  }

  showImages = (e:any)=>{
    this.selectedProductId = e.row.data.id;
    this.imagesVisible = true;
  }

  closeProductModelPopup(){
    this.productModelPopupVisible = false;
  }

  closeProductImagePopup(){
    this.imagesVisible = false;
  }
  
  finaCodeFocusOut(e:any){
    this.loading = true;
    this.productService.getProductsByFinaCode(e.component._changedValue).subscribe({ 
      next:(res : any) => {
        this.finaProductName = res.finaName;
        if(res.Name != null)
          this.productName = res.name;
        this.loading = false;
        this.warningPopupVisible = true;
      },
      error:(err)=> 
        {
          console.log(err);
          this.loading = false;
        }
    });
  }

  // sendFinaRequest = (obs: Observable<IFinaRequestResponse>): Promise<boolean | IFinaRequestResponse> => {
  //   return new Promise(async (resolve) => {
  //     let finaN = "";
  //     setTimeout(() => {
  //       obs.subscribe({
  //         next:(val) =>{
  //           if(val.Name != null)
  //             this.productName = val.Name;
  
  //           if(val.FinaName != null)
  //             this.finaProductName = val.FinaName;

  //           finaN = val.FinaName;
  //         },
  //         error:(err)=> {return false;}
  //       })
  //     }, 1000);
  //     console.log(finaN);
  //     resolve(finaN != null);
  //   });
  // };

  //checkFinaCode = (params: ValidationCallbackData) => this.sendFinaRequest(this.productService.getProductsByFinaCode(params.value));


  sendFinaRequest = (obs: Observable<IFinaRequestResponse>): Promise<boolean> => {
    return new Promise((resolve) => {
      obs.subscribe({
        next: (val) => {
          if (val.name != null) {
            this.productName = val.name;
          }
          if (val.finaName != null) {
            this.finaProductName = val.finaName;
          }
          this.warningPopupVisible = true;
          resolve(val.finaName != null);
        },
        error: (err) => {
          this.productName = "";
          this.finaProductName = "";
          resolve(true);
        },
      });
    });
  };

  checkFinaCode = (params: ValidationCallbackData) => {
    return this.sendFinaRequest(this.productService.getProductsByFinaCode(params.value));
  };

  warningPopupClosing(){
    this.warningPopupVisible = false;
  }
}

export interface IFinaRequestResponse{
  finaName:string;
  name?:string;
}