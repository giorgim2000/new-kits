import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, Subject } from 'rxjs';
import { ProductRestWithStores } from '../Dto\'s/product';

@Injectable({
  providedIn: 'root'
})
export class ProductRestService {
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getProductRestWithStores(id:number){
    const url = `http://91.239.207.195:5000/api/FinaRest/${id}`;
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
