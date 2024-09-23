import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { ModelByYear } from 'src/app/Dto\'s/modelByYear';
import { Product, ProductModel } from 'src/app/Dto\'s/product';
import { ModelByYearService } from 'src/app/services/model-by-year.service';
import { ProductsService } from 'src/app/services/products.service';

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
  isLoading = false;


  constructor(private productService:ProductsService, private modelByYearService:ModelByYearService){}

  ngOnDestroy(): void {
    this.productService.ngOnDestroy();
    this.modelByYearService.ngOnDestroy();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.isLoading = true;
    this.productService.getProducts(true).subscribe({
      next:(res)=>{
        this.products = res;
        this.productGrid.instance.refresh();
        this.isLoading = false;
      }
    })
  }

  addPercentToNum(e:any){
    if(e.rowType == "data" && (e.columnIndex == 7 || e.columnIndex == 5 || e.columnIndex == 3))
      return `${e.value}%`;

    return e.value;
  }

  onChangesSaved(e:any){
    console.log(e);
    // if(e.changes.length > 0 && e.changes[0].type === 'insert'){
    //   this.productService.createProduct({ProductName:e.changes[0].data.productName, description:e.changes[0].data.description, retailPrice:e.changes[0].data.retailPrice,
    //       retailDiscount:e.changes[0].data.retailDiscount, semiWholeSalePrice: e.changes[0].data.semiWholeSalePrice, semiWholeSaleDiscount:e.changes[0].data.semiWholeSaleDiscount,
    //       wholeSalePrice: e.changes[0].data.wholeSalePrice, wholeSaleDiscount: e.changes[0].data.wholeSaleDiscount, warranty: e.changes[0].data.warranty,
    //       comingSoon: e.changes[0].data.comingSoon, active: e.changes[0].data.active, FinaCode: e.changes[0].data.finaCode, Barcode: e.changes[0].data.barcode
    //   }).subscribe({
    //     next:(res) => this.getProducts(),
    //     error:(err)=>console.log(err)
    //   });
    // }

    // if(e.changes.length > 0 && e.changes[0].type === 'update' && e.changes[0].data != undefined){
    //   this.productService.updateProduct(e.changes[0].data.id, {ProductName:e.changes[0].data.productName, description:e.changes[0].data.description, retailPrice:e.changes[0].data.retailPrice,
    //     retailDiscount:e.changes[0].data.retailDiscount, semiWholeSalePrice: e.changes[0].data.semiWholeSalePrice, semiWholeSaleDiscount:e.changes[0].data.semiWholeSaleDiscount,
    //     wholeSalePrice: e.changes[0].data.wholeSalePrice, wholeSaleDiscount: e.changes[0].data.wholeSaleDiscount, warranty: e.changes[0].data.warranty,
    //     comingSoon: e.changes[0].data.comingSoon, active: e.changes[0].data.active, FinaCode: e.changes[0].data.finaCode, Barcode: e.changes[0].data.barcode
    // }).subscribe({
    //   next:(res) => this.getProducts(),
    //   error:(err)=>console.log(err)
    // });
    // }
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
    console.log(e);
    this.isLoading = true;
  }
}
