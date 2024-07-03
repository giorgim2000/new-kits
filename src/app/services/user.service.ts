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
    return this.http.get('http://localhost:5000/api/UserManagement/getusers')
              .pipe(map((res)=>{
                  return res;
              }));
  }

  updateUser(user:any){
    return this.http.put('http://localhost:5000/api/UserManagement', user)
                    .pipe(map((res)=>{
                      return res;
                    }));
  }

  removeUser(id:number){
    return this.http.delete(`http://localhost:5000/api/UserManagement/${id}`)
                    .pipe(map((res)=>{
                      return res;
                    }));
  }
}
