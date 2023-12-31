import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/modelli/interface';
import { userService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  urlUser: string = 'https://gorest.co.in/public/v2/users';
  persone!: User[];
  error: string = '';
  constructor(
    private http: HttpClient,
    private userService: userService,
    public route: Router
  ) {}
  onSubmit(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const gender = form.value.gender;
    const token: string = form.value.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const httpOption = { headers: headers };
    this.http
      .post(this.urlUser, { name, email, gender, status: 'active' }, httpOption)
      .subscribe({
        next: (data: any) => {
          this.userService.createUser(
            data.name,
            data.email,
            data.gender,
            data.status
          );
          localStorage.setItem('token', token);
          localStorage.setItem('email', email);
          localStorage.setItem('user', JSON.stringify(this.userService.user));
          this.http.get(this.urlUser, httpOption).subscribe((data: any) => {
            this.persone = data;
            localStorage.setItem('id', JSON.stringify(this.persone[0].id));
          });
          this.route.navigate(['/login']);
        },
        error: (error) => {
          // Gestione dell'errore
          console.error('Errore durante la richiesta:', error);
          if (error.status === 401) {
            this.error = 'Invalid credentials. Please check and try again.';
          } else if (error.status === 422) {
            this.error = 'This email is already been used or invalid';
          }
        },
      });
  }
}
