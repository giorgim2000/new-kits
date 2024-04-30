import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  User: any | null;
  get loggedIn():boolean{
    return document.cookie.length > 0;
  }

  constructor(private router:Router,private http:HttpClient) { }

  logIn(email: string, password: string){
    let result = {isOk: false, data: ''};
    
    return this.http.post<any>("https://localhost:7210/login", {UserName: email, Password: password}, { withCredentials: true })
        .pipe(
          map(resp => {
            if(resp){
              result.isOk = true;
              this.User = {UserName: resp.username};
              this.isLoggedInSubject.next(true);
              return result;
            }

            return {isOk:false,data:''};
          }),
          catchError(error => {
            if(error.status === 401)
              result.data = 'სახელი ან პაროლი არასწორია!';
            else
              result.data = 'სერვისთან დაკავშირება ვერ მოხერხდა!';
            
            result.isOk = false;
            return of(result);
          })
        );
  }

  getUsername(){
    return this.User.UserName;
  }

  async createAccount(user:any) {
    try {
      let header = new HttpHeaders({
        'Content-Type': "application/json"
      });
      let options = {
        headers: header
      };
      
      // Send request
      this.http.post("https://localhost:7210/register", user, options)
                .subscribe({
                  next: (res) => {
                    console.log(res);
                  },
                  error: (err) => {
                    console.log(err);
                  }
                })
      //this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
  }

  async logOut() {
    return this.http.post("https://localhost:7210/logOut", null, {withCredentials: true}).subscribe({
      next: (res) =>{
        this.isLoggedInSubject.next(false);
      }
    });
  
  }
}
