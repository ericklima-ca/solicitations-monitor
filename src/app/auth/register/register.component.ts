import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterForm } from 'src/app/models';
import { AuthService } from '../../services/auth/auth.service';
import { SolicitationService } from 'src/app/services/solicitation/solicitation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  message?: string;

  constructor(public authService: AuthService) {}

  onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { id, name, lastName, email, password, CenterId } = form.value;
    const registerData: RegisterForm = {
      id: id,
      name: name,
      lastName: lastName,
      password: password,
      CenterId: CenterId,
      email: email,
    };
    this.message = this.authService.singup(registerData);
  }

  ngOnInit() {}
}
