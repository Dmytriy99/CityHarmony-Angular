import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Post } from 'src/app/interface';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  constructor(private apiservice: ApiService) {}
  userID: any;
  Allpost!: Post[];
  id_post: any;
  lenghtPost: number = 75;
  pageSize: number = 10;
  pageIndex: number = 1;
  pageSizeOptions: number[] = [10, 25, 50, 75];
  pageEvent!: PageEvent;
  ngOnInit(): void {
    this.getAllPost(this.pageIndex, this.pageSize);
  }

  getAllPost(pageIndex: number, pageSize: number) {
    this.apiservice
      .getPost3(this.pageIndex, this.pageSize)
      .subscribe((data: any) => {
        this.Allpost = data;
        this.lenghtPost = pageSize;
      });
  }
  onSubmit(form: NgForm) {
    const user_id = +localStorage.getItem('id')!;
    const title: string = form.value.title;
    const body: string = form.value.body;
    console.log(title, body);
    console.log(user_id);
    this.apiservice
      .postPost({ title: title, body: body, user: user_id }, user_id)
      .subscribe((data) => {
        console.log(data);
        this.getAllPost(this.pageIndex, this.pageSize);
      });

    // setTimeout(function () {
    //   location.reload();
    // }, 1500);
  }

  onSearch(form: NgForm) {
    const title = form.value.title;
    console.log(title);
    this.apiservice.getPost4(title).subscribe((data: any) => {
      this.Allpost = data;
    });
  }
  back() {
    window.location.reload();
  }

  selectPage(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getAllPost(this.pageIndex, this.pageSize);
  }
}
