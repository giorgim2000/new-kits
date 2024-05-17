import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModelByYear } from 'src/app/Dto\'s/modelByYear';
import { Product } from 'src/app/Dto\'s/product';
import { ModelByYearService } from 'src/app/services/model-by-year.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrl: './product-panel.component.scss'
})
export class ProductPanelComponent implements OnInit, OnDestroy {
  products:Product[]=[];
  modelByYearDataSource: ModelByYear[]=[];
  productModels:ModelByYear[]=[];
  selectedProductImages:string[]=[];
  selectedProductId : number | undefined;
  productModelPopupVisible = false;
  imagesVisible = false;

  constructor(private productService:ProductsService, private modelByYearService:ModelByYearService){}

  ngOnDestroy(): void {
    this.productService.ngOnDestroy();
    this.modelByYearService.ngOnDestroy();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getModelsByYear();
  }

  getProducts(){
    this.productService.getProducts(true).subscribe({
      next:(res)=>{
        this.products = res;
      }
    })
  }

  getModelsByYear(id?:number,modelId?:number,includeAll?:boolean){
    this.modelByYearService.getModelsByYear(id,modelId,includeAll).subscribe(
      response =>{
        this.modelByYearDataSource = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  addPercentToNum(e:any){
    if(e.rowType == "data" && (e.columnIndex == 7 || e.columnIndex == 5 || e.columnIndex == 3))
      return `${e.value}%`;

    return e.value;
  }

  onChangesSaved(e:any){
    console.log(e);
    if(e.changes.length > 0 && e.changes[0].type === 'insert')
      this.productService.createProduct(e.changes[0].data);

  }

  removeProduct(e:any){

  }

  onEditorPrep(e:any){
    if(!e.row.isNewRow && e.row.isEditing){
      this.selectedProductImages = e.row.data.imageUrls;
      for (let index = 0; index < e.row.data.modelsByYearIds.length; index++) {
        var model = this.modelByYearDataSource.find(i => i.id == e.row.data.modelsByYearIds[index]);
        console.log(model);
        if(model != undefined)
          this.productModels.push(model);
      }
    }
  }

  showModels = (e:any)=>{
    this.selectedProductId = e.row.data.id;
    this.productModelPopupVisible = true;
  }

  showImages = (e:any)=>{
    this.selectedProductId = e.row.data.id;
    this.imagesVisible = true;
  }

  selectedFiles:File[]|undefined;
  fileChanged(e:any){
    this.selectedFiles?.push(e.value[0]);
    const files: File[] = e.value;

    if (files.length > 0) {
        // Read the selected file and set the preview image
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedProductImages.push(e.target.result);
        };
        reader.readAsDataURL(files[0]);
    } else {
        // No file selected, clear the preview
        //this.previewImageUrl = null;
    }
  }

  selectedModel:ModelByYear|undefined;
  modelValueChange(e:any){
    this.selectedModel = e.value;
  }

  addModelToProduct(){
    this.productModels.push(this.selectedModel!);
  }

  saveModels(e:any){
    console.log(e);
  }

  closeProductModelPopup(){
    this.productModelPopupVisible = false;
  }

  closeProductImagePopup(){
    this.imagesVisible = false;
  }
}
