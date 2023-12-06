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
  storage = JSON.parse(localStorage.getItem('user')!);

  constructor(public route: Router) {}
  ngOnInit(): void {
    console.log(this.storage);
  }
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const token = form.value.token;
    this.control(email, token);
  }

  control(emailUser: string, token: string) {
    const email = this.storage.email;
    if (emailUser == email && token == this.localToken) {
      localStorage.setItem('isLog', 'true');
      this.route.navigate(['/posts']);
    } else {
      this.error = 'Utente non trovato';
      console.log(email, this.localToken);
    }
  }
}
