import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Center, RegisterForm } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SolicitationService } from 'src/app/services/solicitation/solicitation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  message?: string
  centers?: Center[]

  constructor(public authService: AuthService, public solicitationService: SolicitationService) {}

  onRegister(form: NgForm) {
    if (form.invalid) {
      return
    }
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

  ngOnInit() {
  }
}