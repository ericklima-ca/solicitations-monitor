import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginForm, RegisterForm } from 'src/app/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userTokenSubject = new Subject<string>();
  message?: string;

  constructor(public http: HttpClient) {}

  login(loginForm: LoginForm) {
    this.http
      .post<{ token: string }>('http://locahost:3000/api/auth/login', loginForm)
      .subscribe((response) => {
        this.userTokenSubject.next(response.token);
      });
  }

  getUserToken() {
    return this.userTokenSubject.asObservable();
  }

  logout() {}

  singup(registerForm: RegisterForm): string | undefined {
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/auth/register',
        registerForm
      )
      .subscribe((response) => {
        this.message = response.message;
      });
    return this.message;
  }
}
