import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { User } from '../Dto\'s/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private unsubscribe$ = new Subject<void>();

  constructor(private http:HttpClient) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getUsers(){
    return this.http.get('https://localhost:7210/api/UserManagement/getusers')
              .pipe(map((res)=>{
                  return res;
              }));
  }

  updateUser(user:any){
    return this.http.put('https://localhost:7210/api/UserManagement', user)
                    .pipe(map((res)=>{
                      return res;
                    }));
  }

  removeUser(id:number){
    return this.http.delete(`https://localhost:7210/api/UserManagement/${id}`)
                    .pipe(map((res)=>{
                      return res;
                    }));
  }
}
