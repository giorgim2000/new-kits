import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlExtractorService {
  configUrl = 'assets/config.json';
  constructor(private http:HttpClient) { }

  getApiUrl(){
    return this.http.get(this.configUrl).pipe(map((res:any) => {return res.apiUrl}));
  }
}