import { Component, OnInit } from '@angular/core';

import { Post, User } from 'src/app/modelli/interface';

import { postService } from 'src/app/service/postService/post.service';
import { userService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-personal-user',
  templateUrl: './personal-user.component.html',
  styleUrls: ['./personal-user.component.css'],
})
export class PersonalUserComponent implements OnInit {
  nopost: string = '';
  localData!: string;
  idpost!: number;
  idUser!: number;
  user!: User;
  post!: Post[];
  photoGirl2: string =
    'https://media.istockphoto.com/id/1222666476/it/vettoriale/donna-divertente-che-more-i-capelli-a-casa-vector.jpg?s=612x612&w=0&k=20&c=IrBrTs24crgvdIuWGiLGqYDchzvIZeuJEavVlHIhqdc=';
  photoMan2: string =
    'https://media.istockphoto.com/id/1349231567/it/vettoriale/personaggio-in-stile-anime-del-giovane-uomo-anime-ragazzo-vettoriale.jpg?s=612x612&w=0&k=20&c=og5UTl4H2bTTuqLDA9cHoYikk9pzYYgHxR1ZhWaopS4=';
  constructor(
    private postService: postService,
    private userService: userService
  ) {}
  ngOnInit(): void {
    const storeId = localStorage.getItem('id');
    if (storeId) {
      this.idUser = +storeId;
      this.userService.getUserByID(this.idUser).subscribe((data: any) => {
        this.user = data;
      });
      this.postService.getPostById(this.idUser).subscribe((data: any) => {
        if (data.length === 0) {
          this.nopost = 'There are no Posts yet';
        } else {
          this.post = data;
        }
      });
    }
  }
}
