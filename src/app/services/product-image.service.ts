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
    return this.http.get(`http://91.239.207.195:5000/api/ProductImages/${productId}`)
                    .pipe(map((res) => {
                      return res;
                    }))
  }

  createProductImage(productId:number, formData: FormData){
    return this.http.post(`http://91.239.207.195:5000/api/ProductImages/${productId}`, formData);
  }

  removeProductImage(id:number){
    return this.http.delete(`http://91.239.207.195:5000/api/ProductImages/${id}`);
  }
}
