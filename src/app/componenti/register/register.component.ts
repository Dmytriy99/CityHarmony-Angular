import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  urlUser: any = 'https://gorest.co.in/public/v2/users';
  idUser: any;
  persone: any;
  constructor(private apiService: ApiService, private htp: HttpClient) {}
  ngOnInit(): void {
    if (this.idUser == null) {
      this.idUser = 'Registrati per scoprirlo';
    }
  }
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
    this.htp
      .post(this.urlUser, { name, email, gender, status: 'active' }, httpOption)
      .subscribe((data: any) => {
        console.log(data);
        this.apiService.createUser(
          data.email,
          data.name,
          data.gender,
          data.status
        );
        localStorage.setItem('user', JSON.stringify(this.apiService.user));
        localStorage.setItem('token', token);
        this.htp.get(this.urlUser, httpOption).subscribe((data) => {
          this.persone = data;
          if (this.idUser == null) {
            this.idUser = 'Registrati per scoprirlo';
          } else {
            this.idUser = this.persone[0].id;
          }
          // console.log(this.idUser);
          // console.log(this.persone[0].id);
          localStorage.setItem('id', this.persone[0].id);
        });
      });
  }
}
