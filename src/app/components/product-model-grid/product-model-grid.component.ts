import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ModelByYear } from 'src/app/Dto\'s/modelByYear';
import { Product, ProductModel } from 'src/app/Dto\'s/product';
import { ModelByYearService } from 'src/app/services/model-by-year.service';
import { ProductModelService } from 'src/app/services/product-model.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-model-grid',
  templateUrl: './product-model-grid.component.html',
  styleUrl: './product-model-grid.component.scss'
})
export class ProductModelGridComponent implements OnInit, OnDestroy {
  @Input()productId?:number;
  @Input()modelByYearId?:number;
  @Input()popupVisible!:boolean;
  @Output() closePopup = new EventEmitter<void>();
  dataSource:ProductModel[]=[];
  products:Product[]=[];
  modelsByYear:ModelByYear[]=[];

  constructor(private productModelService:ProductModelService, private modelByYearService:ModelByYearService, private productsService: ProductsService){}

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.productModelService.ngOnDestroy();
  }

  getData(){
    if(this.productId != null){
      this.productModelService.getByProduct(this.productId).subscribe({
        next:(res)=>{
          this.dataSource = res
          this.modelByYearService.getModelsByYear().subscribe({
            next:(res) => this.modelsByYear = res,
            error:(err)=> console.log(err)
          });
        },
        error:(err)=>console.log(err)
      })
    }
    else{
      this.productModelService.getByModel(this.modelByYearId!).subscribe({
        next:(res)=>{
          this.dataSource = res;
          this.productsService.getProducts().subscribe({
            next:(res) => this.products = res,
            error:(err)=>console.log(err)
          })
        },
        error:(err) => console.log(err)
      })
    }
  }

  saveData(e:any){
    if(e.changes.length > 0 && e.changes[0].type == "insert"){
      if(this.productId != null){
        this.productModelService.create({ProductId: this.productId, ModelByYearId: e.changes[0].data.modelByYearId}).subscribe({
          next:(res) => console.log(res),
          error:(err)=>console.log(err)
        })
      }

      if(this.modelByYearId != null){
        this.productModelService.create({ProductId: e.changes[0].data.productId, ModelByYearId: this.modelByYearId}).subscribe({
          next:(res) => console.log(res),
          error:(err)=>console.log(err)
        })
      }
    }
  }

  removeData(e:any){
    this.productModelService.delete(e.key).subscribe({
      next:(res) => console.log(res),
      error:(err)=>console.log(err)
    })
  }

  popupShown(){
    this.getData();
  }

  popupHidden(){
    this.popupVisible = false;
    this.closePopup.emit();
  }
}
