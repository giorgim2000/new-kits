import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { UrlS } from 'src/assets/config';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {
  //url = "http://91.239.207.195:5000";
  //url = "https://localhost:7210";
  url = UrlS.url2;
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getProductImages(productId:number){
    return this.http.get(this.url + `/api/ProductImages/${productId}`)
                    .pipe(map((res) => {
                      return res;
                    }))
  }

  createProductImage(productId:number, formData: FormData){
    return this.http.post(this.url + `/api/ProductImages/${productId}`, formData);
  }

  removeProductImage(id:number){
    return this.http.delete(this.url + `/api/ProductImages/${id}`);
  }
}
