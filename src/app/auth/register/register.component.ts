import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterForm } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(public authService: AuthService) {}
  message?: string

  onRegister(form: NgForm) {
    const {id, name, lastName, email, password, CenterId} = form.value
    const registerData: RegisterForm = {
      id: id,
      name: name,
      lastName: lastName,
      password: password,
      CenterId: CenterId,
      email: email
    }
    this.message = this.authService.singup(registerData)
  }
}
