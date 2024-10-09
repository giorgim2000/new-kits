import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export class authInterceptor implements HttpInterceptor {
  //constructor(private authService:AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    const header = {
      'Authorization': `Bearer ${token}`
    }
    if(token != null){
      const updated = req.clone({setHeaders: header});

      return next.handle(updated);
    }
    return next.handle(req);
  }
};
