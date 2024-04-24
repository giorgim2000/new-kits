import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  User:any | null;
  get loggedIn():boolean{
    return this.User ? true : false;
  }

  constructor(private router:Router,private http:HttpClient) { }

  logIn(email: string, password: string){

  }

  async createAccount(user:any) {
    
  }

  async changePassword(email: string, recoveryCode: string) {
    
  }

  async logOut() {
  }
}
