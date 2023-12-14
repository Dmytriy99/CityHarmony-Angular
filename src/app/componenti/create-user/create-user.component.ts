import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  constructor(private userService: userService) {}
  onSubmit(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const gender = form.value.gender;
    this.userService
      .addUser({
        name: name,
        email: email,
        gender: gender,
        status: 'active',
      })
      .subscribe((data) => {});
  }
}
