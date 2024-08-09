import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { UrlS } from 'src/assets/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //url = "http://91.239.207.195:5000";
  //url = "https://localhost:7210";
  url = UrlS.url2;
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getUsers(){
    return this.http.get(this.url + '/api/UserManagement/getusers')
              .pipe(map((res)=>{
                  return res;
              }));
  }

  updateUser(user:any){
    return this.http.put(this.url + '/api/UserManagement', user)
                    .pipe(map((res)=>{
                      return res;
                    }));
  }

  removeUser(id:number){
    return this.http.delete(this.url + `/api/UserManagement/${id}`)
                    .pipe(map((res)=>{
                      return res;
                    }));
  }
}
