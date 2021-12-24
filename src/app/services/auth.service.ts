import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginForm, RegisterForm, AuthUser } from 'src/app/models';

interface ResponseData {
  ok?: boolean;
  token?: string;
  user?: AuthUser;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUser?: AuthUser;
  private authToken?: string;
  private authenticationSubject = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  login(loginForm: LoginForm) {
    this.http
      .post<ResponseData>('http://localhost:3000/api/auth/login', loginForm)
      .subscribe({
        next: (response) => {
          if (response.token && response.user) {
            this.saveAuth(response.token, response.user);
            this.authenticationSubject.next(true);
            this.router.navigate(['/']);
          }
        },
        error: () => {
          this.authenticationSubject.next(false);
        },
      });
  }

  logout() {
    this.delelteAuth();
    this.authenticationSubject.next(false);
    this.router.navigate(['/login']);
  }

  singup(registerForm: RegisterForm) {
    this.http
      .post<{ ok: boolean; message: string }>(
        'http://localhost:3000/api/auth/signup',
        registerForm
      )
      .subscribe();
  }

  verifyAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token || !user) {
      return;
    }
    this.authToken = token;
    this.authUser = JSON.parse(user);
    this.authenticationSubject.next(true);
  }

  get authSubject() {
    return this.authenticationSubject.asObservable();
  }

  get token() {
    return this.authToken;
  }

  get user() {
    return this.authUser;
  }

  private saveAuth(token: string, user: AuthUser) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authUser = user;
    this.authToken = token;
  }
  private delelteAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authToken = undefined;
    this.authUser = undefined;
  }
}
