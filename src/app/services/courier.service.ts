import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, Subject } from 'rxjs';
import { CourierDto } from '../Dto\'s/courier';
import { ApiUrlExtractorService } from './api-url-extractor.service';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
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

  getCouriers(){
    let url = this.url + `/api/Couriers`;

    return this.http.get(url).pipe(map((response)=>{
      return response;
    }), catchError((error) => {
      console.log(error);
      return of(error);
    }));
  }

  postCourier(input:CourierDto){
    return this.http.post(this.url + '/api/Couriers', {input});
  }

  putCourier(id:number, input:CourierDto){
    return this.http.put(this.url + `/api/Couriers/${id}`, {input});
  }

  removeCourier(id:number){
    return this.http.delete(this.url + `/api/Couriers/${id}`);
  }

}
