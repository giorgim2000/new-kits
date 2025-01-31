import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, map, of, timeout } from 'rxjs';
import { CreateProduct } from '../Dto\'s/product';
import { UrlS } from 'src/assets/config';
import { IFinaRequestResponse } from '../pages/admin-panel/product-panel/product-panel.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //url = "http://91.239.207.195:5000";
  //url = "https://localhost:7210";
  url = UrlS.url2;
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getProducts(includeAll:boolean = false, search?:string, modelId?:number, modelByYearId?:number){
    var url = this.url + `/api/Products?includeAll=${includeAll}`;
    if(search != undefined)
      url += `&search=${search}`;

    if(modelId != undefined)
      url += `&modelId=${modelId}`;

    if(modelByYearId != undefined)
      url += `&modelByYearId=${modelByYearId}`;

    return this.http.get(url).pipe(
      map((res) => {
      return res;
    }),
    catchError((error) => {
      console.log(error);
      return of(error);
    })
    )
  }

  getProductsByFinaCode(code:string){
    return this.http.get<IFinaRequestResponse>(this.url + `/code/${code}`);
  }

  createProduct(product:CreateProduct){
    let header = new HttpHeaders({
      'Content-Type': "application/json"
    });
    let options = {
      headers: header
    };
    return this.http.post(this.url + "/api/Products", product, options)
                    .pipe(map((res) =>{
                      return res;
                    }),
                    catchError((error) => {
                      console.log(error);
                      return of(error);
                    }))
  }

  updateProduct(id:number, product:CreateProduct){
    let header = new HttpHeaders({
      'Content-Type': "application/json"
    });
    let options = {
      headers: header
    }; 
    return this.http.put(this.url + `/api/Products/${id}`, product, options)
                    .pipe(map((res) =>{
                      return res;
                    }),
                    catchError((error) => {
                      console.log(error);
                      return of(error);
                    }))
  }

  removeProduct(id:number){
    return this.http.delete(this.url + `/api/Products/${id}`);
  }
}
