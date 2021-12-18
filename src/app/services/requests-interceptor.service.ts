import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.token;
    if (token) {
      const interceptedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(interceptedReq);
    } else {
      return next.handle(req);
    }
  }
}
