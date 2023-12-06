import { Component, OnInit } from '@angular/core';
// import { Post } from 'src/app/interface';
import { Post } from 'src/app/modelli/example.model';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { postService } from 'src/app/service/postService/post.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  constructor(private postService: postService) {}
  title!: string;
  body!: string;
  Allpost!: Post[];
  lenghtPost: number = 75;
  pageSize: number = 10;
  pageIndex: number = 1;
  pageSizeOptions: number[] = [10, 25, 50, 75];
  pageEvent!: PageEvent;
  ngOnInit(): void {
    this.getAllPost(this.pageIndex, this.pageSize);
  }

  getAllPost(pageIndex: number, pageSize: number) {
    this.postService
      .getAllPostByIndex(this.pageIndex, this.pageSize)
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
    this.postService
      .postPost({ title: title, body: body, user: user_id }, user_id)
      .subscribe((data) => {
        console.log(data);
        this.getAllPost(this.pageIndex, this.pageSize);
      });
  }

  onSearch(form: NgForm) {
    const title = form.value.title;
    console.log(title);
    this.postService.getBySearch(title).subscribe((data: any) => {
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

  clear() {
    setTimeout(() => {
      this.title = '';
      this.body = '';
    }, 1500);
  }
}
