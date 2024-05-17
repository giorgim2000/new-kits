import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getProductImages(productId:number){
    return this.http.get(`https://localhost:7210/api/ProductImages/${productId}`)
                    .pipe(map((res) => {
                      return res;
                    }))
  }

  createProductImage(productId:number, formData: FormData){
    return this.http.post(`https://localhost:7210/api/ProductImages/${productId}`, formData);
  }

  removeProductImage(id:number){
    return this.http.delete(`https://localhost:7210/api/ProductImages/${id}`);
  }
}
