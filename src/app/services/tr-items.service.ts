import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UrlS } from 'src/assets/config';
import { CreateTrItemDto, GetTrItemQuery, UpdateTrItemsDto } from '../Dto\'s/courier';

@Injectable({
  providedIn: 'root'
})
export class TrItemsService {
  url = UrlS.url2;
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
  getItems(query:GetTrItemQuery){
    var header = new HttpHeaders();
    header.append("input", JSON.stringify(query));
    return this.http.get(this.url + "/api/transferItems", {headers: header});
  }

  postTrItem(item:CreateTrItemDto){
    var body : CreateTrItemDto[] = [item];
    return this.http.post(this.url + "/api/transferItems", body);
  }

  updateTrItems(input:UpdateTrItemsDto){
    return this.http.put(this.url + "/api/transferItems/UpdateTrItemStatus", input);
  }

  removeTransferItems(ids:number[]){
    return this.http.put(this.url + "/api/transferItems/DeactivateTrItems", ids);
  }
}