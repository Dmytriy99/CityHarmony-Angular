import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  idUser: any;
  persone: any;
  constructor(private apiService: ApiService) {}
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
    console.log(form.value);
    this.apiService
      .addUser({
        name: name,
        email: email,
        gender: gender,
        status: 'active',
      })
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
        this.apiService.getUser().subscribe((data) => {
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
