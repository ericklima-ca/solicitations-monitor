import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginForm, RegisterForm, AuthUser } from 'src/app/models';

interface ResponseData {
  token?: string;
  message?: string;
  user?: AuthUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUser?: AuthUser;
  private responseData: ResponseData = {};
  private authenticationSubject = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  login(loginForm: LoginForm) {
    this.http
      .post<ResponseData>('http://localhost:3000/api/auth/login', loginForm)
      .subscribe((response) => {
        const token = response.token;
        if (token) {
          this.authUser = response.user;
          this.responseData.token = token;
          this.authenticationSubject.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  get authSubject() {
    return this.authenticationSubject.asObservable();
  }

  get token() {
    return this.responseData.token;
  }

  get message() {
    return this.responseData.message;
  }

  get user() {
    return this.authUser;
  }

  logout() {
    this.responseData.token = undefined;
    this.authUser = undefined;
    this.authenticationSubject.next(false);
    this.router.navigate(['/login']);
  }

  singup(registerForm: RegisterForm) {
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/auth/signup',
        registerForm
      )
      .subscribe((response) => {
        this.responseData.message = response.message;
      });
  }
}
