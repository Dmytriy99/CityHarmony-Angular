import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-personal-user',
  templateUrl: './personal-user.component.html',
  styleUrls: ['./personal-user.component.css'],
})
export class PersonalUserComponent implements OnInit {
  localData!: string;
  idpost!: number;
  idUser!: number;
  user: any;
  post: any;
  photoGirl2: string =
    'https://media.istockphoto.com/id/1222666476/it/vettoriale/donna-divertente-che-more-i-capelli-a-casa-vector.jpg?s=612x612&w=0&k=20&c=IrBrTs24crgvdIuWGiLGqYDchzvIZeuJEavVlHIhqdc=';
  photoMan2: string =
    'https://media.istockphoto.com/id/1349231567/it/vettoriale/personaggio-in-stile-anime-del-giovane-uomo-anime-ragazzo-vettoriale.jpg?s=612x612&w=0&k=20&c=og5UTl4H2bTTuqLDA9cHoYikk9pzYYgHxR1ZhWaopS4=';
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.idUser = +localStorage.getItem('id')!;
    this.apiService.getUser2(this.idUser).subscribe((data: any) => {
      this.user = data;
      console.log(this.user);
    });
    this.apiService.getPost2(this.idUser).subscribe((data: any) => {
      console.log(data);
      this.post = data;
    });
  }
}
