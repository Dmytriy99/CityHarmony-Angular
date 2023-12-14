import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/modelli/interface';
import { postService } from 'src/app/service/postService/post.service';
import { userService } from 'src/app/service/userService/user.service';
import { User } from 'src/app/modelli/interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  noPost: string = '';
  idUser: number = +this.route.snapshot.paramMap.get('id')!;
  users!: User;
  post!: Post[];
  photoGirl2: string =
    'https://media.istockphoto.com/id/1222666476/it/vettoriale/donna-divertente-che-more-i-capelli-a-casa-vector.jpg?s=612x612&w=0&k=20&c=IrBrTs24crgvdIuWGiLGqYDchzvIZeuJEavVlHIhqdc=';
  photoMan2: string =
    'https://media.istockphoto.com/id/1349231567/it/vettoriale/personaggio-in-stile-anime-del-giovane-uomo-anime-ragazzo-vettoriale.jpg?s=612x612&w=0&k=20&c=og5UTl4H2bTTuqLDA9cHoYikk9pzYYgHxR1ZhWaopS4=';
  constructor(
    private route: ActivatedRoute,
    private routing: Router,
    private postService: postService,
    private userService: userService
  ) {}
  ngOnInit(): void {
    if (this.idUser) {
      this.userService.getUserByID(this.idUser).subscribe((data: any) => {
        this.users = data;
      });
      this.postService.getPostById(this.idUser).subscribe((data: any) => {
        if (data.length === 0) {
          this.noPost = 'There are no Posts yet';
        } else {
          this.post = data;
        }
      });
    }
  }
  deleteUser() {
    this.userService.deleteUser2(this.idUser).subscribe((data: any) => {
      this.users = data;
      this.routing.navigate(['/users']);
    });
  }
}
