import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { map, catchError, of, BehaviorSubject, Subject, Observable } from 'rxjs';
import { AuthResponseDto, IUserClaim, UserForAuthenticationDto } from '../Dto\'s/User';
import { UrlS } from 'src/assets/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = UrlS.url2;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  User: any | null;
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  get loggedIn():boolean{
    return localStorage.getItem('token') != null && localStorage.getItem('username') != null;
  }

  constructor(private router:Router, private http:HttpClient) {}

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
    
    const isGuarded = this.isAdminGuardedRoute(this.router.url);

  if (isGuarded) {
    // If the route is guarded, redirect to the login or home page
    this.router.navigate(['/login-form']);
  } else {
    // If the route is not guarded, just reload the page
    location.reload();
  }
  }

  private isAdminGuardedRoute(url: string): boolean {
    const guardedRoutes = [
      '/admin-panel'
    ];
  
    return guardedRoutes.some(route => url.startsWith(route));
  }

  // isTokenActive(){
  //   return this.http.get(this.url + "/api/role/tokenactive");
  // }
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