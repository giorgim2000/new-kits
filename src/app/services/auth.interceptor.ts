import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class authInterceptor implements HttpInterceptor {
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
