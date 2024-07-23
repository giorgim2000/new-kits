import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { map, catchError, of, BehaviorSubject, Subject, Observable } from 'rxjs';
import { AuthResponseDto, IUserClaim, UserForAuthenticationDto } from '../Dto\'s/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //url = "http://91.239.207.195:5000";
  url = "https://localhost:7210";
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  User: any | null;
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();
  get loggedIn():boolean{
    return localStorage.getItem('token') != null && localStorage.getItem('username') != null;
  }

  constructor(private router:Router,private http:HttpClient) {
    
  }    
  
  //private envUrl: EnvironmentUrlService

  // logIn(email: string, password: string){
  //   let result = {isOk: false, data: ''};
    
  //   return this.http.post<any>("https://localhost:7210/login", {UserName: email, Password: password}, { withCredentials: true })
  //       .pipe(
  //         map(resp => {
  //           if(resp){
  //             result.isOk = true;
  //             this.User = {UserName: resp.username};
  //             this.isLoggedInSubject.next(true);
  //             return result;
  //           }

  //           return {isOk:false,data:''};
  //         }),
  //         catchError(error => {
  //           if(error.status === 401)
  //             result.data = 'სახელი ან პაროლი არასწორია!';
  //           else
  //             result.data = 'სერვისთან დაკავშირება ვერ მოხერხდა!';
            
  //           result.isOk = false;
  //           return of(result);
  //         })
  //       );
  // }

  public loginUser = (route: string, body: UserForAuthenticationDto) => {
    return this.http.post<AuthResponseDto>(this.url + "/login", body);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  getUsername(){
    return localStorage.getItem('username');
  }

  isAdmin(): Observable<boolean> {
    return this.http.get<boolean>(this.url + "/api/Role");
  }

  // async createAccount(user:any) {
  //   try {
  //     let header = new HttpHeaders({
  //       'Content-Type': "application/json"
  //     });
  //     let options = {
  //       headers: header
  //     };
      
  //     // Send request
  //     this.http.post(this.url + "/register", user, options)
  //               .subscribe({
  //                 next: (res) => {
  //                   console.log(res);
  //                 },
  //                 error: (err) => {
  //                   console.log(err);
  //                 }
  //               })
  //     //this.router.navigate(['/create-account']);
  //     return {
  //       isOk: true
  //     };
  //   }
  //   catch {
  //     return {
  //       isOk: false,
  //       message: "Failed to create account"
  //     };
  //   }
  // }

  async createAccount(user: any) {
    try {
      let header = new HttpHeaders({
        'Content-Type': "application/json"
      });
      let options = {
        headers: header
      };

      // Send request and wait for response
      const response = await this.http.post(this.url + "/register", user, options).toPromise();
      return {
        isOk: true,
        response
      };
    }
    catch (error) {
      return {
        isOk: false,
        message: "Failed to create account",
        error
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

  getUserInfo(){
    return this.http.post<IUserClaim[]>(this.url + '/api/role', null);
  }

  public logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('username');
    this.sendAuthStateChangeNotification(false);
    if(this.router.url.startsWith('/admin-panel') || this.router.url.startsWith('/products'))
      this.router.navigate(['home']);
  }
}


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const isLoggedIn = this.authService.loggedIn;
    if(!isLoggedIn)
      return of(false);


    return this.authService.isAdmin().pipe(
      map((isAdmin: boolean) => {
        if (isAdmin) {
          return true;
        } else {
          this.authService.logout(); // Redirect to a not authorized page or login
          return false;
        }
      }),
      catchError((error) => {
        this.authService.logout();
        this.router.navigate(['/login-form']);
        return of(false);
      })
    );
  }
}
