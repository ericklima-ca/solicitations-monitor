import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginForm, RegisterForm } from 'src/app/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  responseSubject = new Subject<{ token: string; message: string }>();
  message?: string;

  constructor(public http: HttpClient) {}

  login(loginForm: LoginForm) {
    this.http
      .post<{ token: string; message: string }>(
        'http://localhost:3000/api/auth/login',
        loginForm
      )
      .subscribe({
        next: (response) => {
          console.log(response);

          this.responseSubject.next(response);
        },
        error: (response) => {
          this.responseSubject.next(response);
        },
      });
  }

  getResponseSubject() {
    return this.responseSubject.asObservable();
  }

  logout() {}

  singup(registerForm: RegisterForm): string | undefined {
    this.http
      .post<{ message: string }>('http://localhost:3000/api/auth/signup', {
        ...registerForm,
      })
      .subscribe((response) => {
        this.message = response.message;
      });
    return this.message;
  }
}
