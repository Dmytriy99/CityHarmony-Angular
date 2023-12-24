import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  error!: string;
  localToken: string = localStorage.getItem('token')!;
  localEmail: string = localStorage.getItem('email')!;
  constructor(public route: Router) {}
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const token = form.value.token;
    this.control(email, token);
  }

  control(emailUser: string, token: string) {
    if (emailUser == this.localEmail && token == this.localToken) {
      localStorage.setItem('isLog', 'true');
      this.route.navigate(['/users']);
    } else {
      this.error = 'User not found';
    }
  }
}
