import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  error!: string;
  idLocal: number = +localStorage.getItem('id')!;
  localToken: string = localStorage.getItem('token')!;
  constructor(private apiService: ApiService, private route: Router) {}
  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    const idUser = form.value.id;
    const token = form.value.token;
    this.control(idUser, token);
  }

  control(idUser: number, token: string) {
    if (idUser == this.idLocal && token == this.localToken) {
      localStorage.setItem('isLog', 'true');
      this.route.navigate(['/posts']);
    } else {
      this.error = 'Utente non trovato';
    }
  }
}
