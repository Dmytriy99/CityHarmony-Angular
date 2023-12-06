import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/modelli/example.model';
import { userService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  urlUser: string = 'https://gorest.co.in/public/v2/users';
  persone!: User[];
  error: string = '';
  constructor(
    private http: HttpClient,
    private userService: userService,
    public route: Router
  ) {}
  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const gender = form.value.gender;
    const token: string = form.value.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const httpOption = { headers: headers };
    console.log(form.value);
    // this.http
    //   .post(this.urlUser, { name, email, gender, status: 'active' }, httpOption)
    //   .subscribe((data: any) => {
    //     console.log(data);
    //     this.userService.createUser(
    //       data.name,
    //       data.email,
    //       data.gender,
    //       data.status
    //     );
    //     localStorage.setItem('user', JSON.stringify(this.userService.user));
    //     localStorage.setItem('token', token);
    //     this.http.get(this.urlUser, httpOption).subscribe((data: any) => {
    //       this.persone = data;
    //       localStorage.setItem('id', JSON.stringify(this.persone[0].id));
    //     });
    //   }, error => {
    //     console.error()
    //   });
    this.http
      .post(this.urlUser, { name, email, gender, status: 'active' }, httpOption)
      .subscribe({
        next: (data: any) => {
          // Successo
          console.log(data);
          this.userService.createUser(
            data.name,
            data.email,
            data.gender,
            data.status
          );
          localStorage.setItem('user', JSON.stringify(this.userService.user));
          localStorage.setItem('token', token);
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
            // Credenziali non valide, gestisci l'errore qui
            this.error = 'Invalid credentials. Please check and try again.';
          } else {
            // Altri tipi di errori, gestisci secondo necessità
            this.error = 'Si è verificato un errore durante la richiesta.';
          }
        },
      });
  }
}

// .getUserByID(this.post.user_id)
//         .pipe(catchError(() => of(this.error)))
//         .subscribe((data: any) => {
//           if (data !== this.error) {
//             this.userName = data.name;
//             this.userEmail = data.email;
//           } else {
//             this.userName = this.error;
//           }
//         });
