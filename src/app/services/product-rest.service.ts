import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, Subject } from 'rxjs';
import { ProductRestWithStores } from '../Dto\'s/product';
import { ApiUrlExtractorService } from './api-url-extractor.service';

@Injectable({
  providedIn: 'root'
})
export class ProductRestService {
  url = "http://91.239.207.195:5000";
  //url = "https://localhost:7210";
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

  getProductRestWithStores(id:number){
    const url = this.url + `/api/FinaRest/${id}`;
    return this.http.get<ProductRestWithStores[]>(url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error fetching product rest with stores:', error);
        return of([]);
      })
    );
  }
}
