import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login({
      id: form.value.id,
      password: form.value.password,
    });
    this.authService.getUserToken().subscribe(token => {
      if (token) {
        this.router.navigate(['/'])
      }
    })
  }

  ngOnInit() {
    this.authService.getUserToken().subscribe(token => {
      if (token) {
        this.router.navigate(['/'])
      }
    })
  }
}
