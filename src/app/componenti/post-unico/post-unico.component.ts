import { Component, OnInit, Input } from '@angular/core';

import { catchError, of } from 'rxjs';
import { Post } from 'src/app/modelli/example.model';
import { CommentiComponent } from '../commenti/commenti.component';
import { userService } from 'src/app/service/userService/user.service';
@Component({
  selector: 'app-post-unico',
  templateUrl: './post-unico.component.html',
  styleUrls: ['./post-unico.component.css'],
})
export class PostUnicoComponent implements OnInit {
  error: string = 'Utente non Trovato';
  userName!: string;
  userEmail!: string;
  useriD!: number;
  @Input() post!: Post;
  iDpost!: number;
  user!: number;
  title!: string;
  body!: string;
  constructor(private userService: userService) {}
  ngOnInit(): void {
    if (this.post) {
      this.title = this.post.title;
      this.body = this.post.body;
      this.iDpost = this.post.id;
      this.userService
        .getUserByID(this.post.user_id)
        .pipe(catchError(() => of(this.error)))
        .subscribe((data: any) => {
          if (data !== this.error) {
            this.userName = data.name;
            this.userEmail = data.email;
          } else {
            this.userName = this.error;
          }
        });
      // });
    }
  }
}
