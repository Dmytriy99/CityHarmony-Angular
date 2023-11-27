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
  idLocal: number = +localStorage.getItem('id')!;
  localToken: string = localStorage.getItem('token')!;
  storage = JSON.parse(localStorage.getItem('user')!);

  constructor(private route: Router) {}
  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    const idUser = form.value.email;
    const token = form.value.token;
    this.control(idUser, token);
  }

  control(emailUser: number, token: string) {
    const email = this.storage.email;
    if (emailUser == email && token == this.localToken) {
      localStorage.setItem('isLog', 'true');
      this.route.navigate(['/posts']);
    } else {
      this.error = 'Utente non trovato';
    }
  }
}
