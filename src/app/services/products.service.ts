import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, map, of } from 'rxjs';
import { CreateProduct } from '../Dto\'s/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getProducts(includeAll:boolean = false, search?:string, modelId?:number, modelByYearId?:number){
    var url = `https://localhost:7210/api/Products?includeAll=${includeAll}`;
    if(search != undefined)
      url += `&search=${search}`;

    if(modelId != undefined)
      url += `&modelId=${modelId}`;

    if(modelByYearId != undefined)
      url += `&modelByYearId=${modelByYearId}`;

    return this.http.get(url).pipe(map((res) =>{
      return res;
    }),
    catchError((error) => {
      console.log(error);
      return of(error);
    })
    )
  }

  createProduct(product:CreateProduct){
    return this.http.post("https://localhost:7210/api/Products", {product})
                    .pipe(map((res) =>{
                      return res;
                    }),
                    catchError((error) => {
                      console.log(error);
                      return of(error);
                    }))
  }
}
