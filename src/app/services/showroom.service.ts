import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UrlS } from 'src/assets/config';

@Injectable({
  providedIn: 'root'
})
export class ShowroomService {
  url = UrlS.url2;
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  
}
