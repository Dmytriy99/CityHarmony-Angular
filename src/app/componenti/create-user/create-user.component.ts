import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const gender = form.value.gender;
    this.apiService
      .addUser({
        name: name,
        email: email,
        gender: gender,
        status: 'active',
      })
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}
