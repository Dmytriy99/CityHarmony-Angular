import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  idpost!: number;
  idUser: number = +this.route.snapshot.paramMap.get('id')!;
  users: any;
  post: any;
  photoGirl2: string =
    'https://media.istockphoto.com/id/1222666476/it/vettoriale/donna-divertente-che-more-i-capelli-a-casa-vector.jpg?s=612x612&w=0&k=20&c=IrBrTs24crgvdIuWGiLGqYDchzvIZeuJEavVlHIhqdc=';
  photoMan2: string =
    'https://media.istockphoto.com/id/1349231567/it/vettoriale/personaggio-in-stile-anime-del-giovane-uomo-anime-ragazzo-vettoriale.jpg?s=612x612&w=0&k=20&c=og5UTl4H2bTTuqLDA9cHoYikk9pzYYgHxR1ZhWaopS4=';
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private routing: Router
  ) {}
  ngOnInit(): void {
    this.apiService.getUser2(this.idUser).subscribe((data: any) => {
      this.users = data;
    });
    this.apiService.getPost2(this.idUser).subscribe((data: any) => {
      this.post = data;
    });
  }
  deleteUser() {
    this.apiService.deleteUser2(this.idUser).subscribe((data) => {
      this.users = data;
      console.log('ciao');
      this.routing.navigate(['/users']);
    });
  }
}
