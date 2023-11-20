import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-commenti',
  templateUrl: './commenti.component.html',
  styleUrls: ['./commenti.component.css'],
})
export class CommentiComponent implements OnInit {
  dataLocal: any;
  user: any;
  comment: any;
  noComment = '';
  @Input() postId!: number;
  constructor(private apiservice: ApiService) {}
  ngOnInit(): void {
    this.dataLocal = localStorage.getItem('user');
    this.user = JSON.parse(this.dataLocal);
    this.apiservice.getComment(this.postId).subscribe((data: any) => {
      if (data.length === 0) {
        this.noComment = 'Non sono ancora presenti commenti';
      } else {
        this.comment = data;
        // console.log(this.comment);
      }
    });
  }
  onSubmit(form: NgForm) {
    const body = form.value.body;
    const email = this.user.email;
    const name = this.user.name;

    console.log(this.postId);
    this.apiservice
      .postComment(
        {
          body: body,
          email: email,
          name: name,
        },
        this.postId
      )
      .subscribe((data) => {
        console.log(data);
        this.apiservice.getComment(this.postId).subscribe((data) => {
          this.comment = data;
          console.log(data);
        });
      });
    // setTimeout(function () {
    //   location.reload();
    // }, 1000);
  }
}
