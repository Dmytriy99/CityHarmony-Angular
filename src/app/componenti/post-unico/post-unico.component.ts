import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { catchError, of } from 'rxjs';
import { Post } from 'src/app/interface';
@Component({
  selector: 'app-post-unico',
  templateUrl: './post-unico.component.html',
  styleUrls: ['./post-unico.component.css'],
})
export class PostUnicoComponent implements OnInit {
  error: any = 'Utente non Trovato';
  userName!: string;
  userEmail!: string;
  useriD!: number;
  @Input() post!: Post;
  iDpost!: number;
  user!: number;
  title!: string;
  body!: string;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    if (this.post) {
      this.title = this.post.title;
      this.body = this.post.body;
      //console.log(this.useriD);
      // this.iDpost = +this.route.snapshot.paramMap.get('id')!;
      // this.post = this.apiService.getPost(this.iDpost).subscribe((data: any) => {
      //   this.useriD = data.user_id;
      //   this.post = data;
      //   console.log(this.post);
      //   console.log(this.useriD);
      //   // this.apiService.getUser2(this.useriD).subscribe((data: any) => {
      //   //   this.userName = data.name;
      //   //   this.userEmail = data.email;
      //   //   catchError((error) => of(error));
      //   // });
      this.apiService
        .getUser2(this.post.user_id)
        .pipe(catchError(() => of(this.error)))
        .subscribe((data) => {
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
