import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { CreateProductModel, ProductModel } from '../Dto\'s/product';
import { ApiUrlExtractorService } from './api-url-extractor.service';

@Injectable({
  providedIn: 'root'
})
export class ProductModelService {
  //url = "http://91.239.207.195:5000";
  url = "https://localhost:7210";
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient, private adressExtractor:ApiUrlExtractorService) {
    adressExtractor.getApiUrl().subscribe({
      next:(res:any) => this.url = res,
      error:(err) => console.log(err)
    })}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getByProduct(productId:number){
    let url = this.url + `/api/ProductModels?productId=${productId}`;

    return this.http.get<ProductModel[]>(url).pipe(map((res)=>{
      return res;
    }));
  }

  getByModel(modelByYearId:number){
    let url = this.url + `/api/ProductModels?modelByYearId=${modelByYearId}`;

    return this.http.get<ProductModel[]>(url).pipe(map((res)=>{
      return res;
    }));
  }

  create(input:CreateProductModel){
    let url = this.url + `/api/ProductModels`;

    return this.http.post(url, {ProductId: input.ProductId, ModelByYearId:input.ModelByYearId}).pipe();
  }

  delete(id:number){
    let url = this.url + `/api/ProductModels/${id}`;

    return this.http.delete(url);
  }
}
