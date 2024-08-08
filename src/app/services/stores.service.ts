import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { ApiUrlExtractorService } from './api-url-extractor.service';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
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

  getStores(){
    return this.http.get(this.url + '/api/FinaStores')
              .pipe(map((res)=>{
                  return res;
              }));
  }
}
