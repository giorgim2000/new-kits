import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModelByYear } from 'src/app/Dto\'s/modelByYear';
import { Product, ProductModel } from 'src/app/Dto\'s/product';
import { ModelByYearService } from 'src/app/services/model-by-year.service';
import { ProductModelService } from 'src/app/services/product-model.service';

@Component({
  selector: 'app-product-model-grid',
  templateUrl: './product-model-grid.component.html',
  styleUrl: './product-model-grid.component.scss'
})
export class ProductModelGridComponent implements OnInit, OnDestroy {
  @Input()productId?:number;
  @Input()modelByYearId?:number;
  @Input()popupVisible!:boolean;
  dataSource:ProductModel[]=[];
  products:Product[]=[];
  modelsByYear:ModelByYear[]=[];

  constructor(private productModelService:ProductModelService, private modelByYearService:ModelByYearService){}

  ngOnInit(): void {
    this.getData();
  }
  ngOnDestroy(): void {
    this.productModelService.ngOnDestroy();
  }

  getData(){
    console.log(this.productId);
    if(this.productId != null){
      this.productModelService.getByProduct(this.productId).subscribe({
        next:(res)=>this.dataSource = res,
        error:(err)=>console.log(err)
      })
    }
    else{
      this.productModelService.getByModel(this.modelByYearId!).subscribe({
        next:(res)=> this.dataSource = res,
        error:(err) => console.log(err)
      })
    }
  }

  ing(e:any){
    console.log("ing");
    console.log(e);
    this.modelByYearService.getModelsByYear().subscribe({
      next:(res) => this.modelsByYear = res
    });
  }

  init(e:any){
    console.log(e);
    this.modelByYearService.getModelsByYear().subscribe({
      next:(res) => this.modelsByYear = res
    });
  }

  ed(e:any){
    console.log("ed");
    console.log(e);
  }
}
