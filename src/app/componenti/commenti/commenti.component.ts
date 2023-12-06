import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comment, User } from 'src/app/modelli/example.model';
import { CommentService } from 'src/app/service/commentService/comment.service';

@Component({
  selector: 'app-commenti',
  templateUrl: './commenti.component.html',
  styleUrls: ['./commenti.component.css'],
})
export class CommentiComponent implements OnInit {
  dataLocal: any;
  user!: User;
  comment: Comment[] = [];

  noComment: string = '';
  @Input() postId!: number;
  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    if (this.postId) {
      this.dataLocal = localStorage.getItem('user');
      this.user = JSON.parse(this.dataLocal);
      this.commentService.getComment(this.postId).subscribe((data: any) => {
        if (data.length === 0) {
          this.noComment = 'Non sono ancora presenti commenti';
        } else {
          this.comment = data;
          console.log(this.comment);
        }
      });
    }
  }

  onSubmit(form: NgForm) {
    if (this.user && this.user.email) {
      const body = form.value.body;
      const email = this.user.email;
      const name = this.user.name;
      console.log(email);
      console.log(this.postId);
      this.commentService
        .postComment(
          {
            body: body,
            email: email,
            name: name,
            post_id: 12345,
          },
          this.postId
        )
        .subscribe((data) => {
          console.log(data);
          this.commentService.getComment(this.postId).subscribe((data: any) => {
            this.comment = data;
            console.log(data);
          });
        });
    }
  }
}
