import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {
  token?: string;
  constructor(public authService: AuthService, public router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.authService.getResponseSubject().subscribe((response) => {
      this.token = response.token;
    });
    if (this.token) {
      let reqCloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.token),
      });
      return next.handle(reqCloned);
    }
    return next.handle(req);
  }
}
