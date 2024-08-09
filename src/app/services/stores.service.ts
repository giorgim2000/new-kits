import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { UrlS } from 'src/assets/config';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  //url = "http://91.239.207.195:5000";
  //url = "https://localhost:7210";
  url = UrlS.url2;
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getStores(){
    return this.http.get(this.url + '/api/FinaStores')
              .pipe(map((res)=>{
                  return res;
              }));
  }

  getStoreProductsRest(storeId:number){
    return this.http.get(this.url + `/api/FinaStores/GetStoreProductsRest/${storeId}`)
              .pipe(map((res)=>{
                return res;
              }));
  }
}
