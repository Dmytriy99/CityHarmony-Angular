import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/modelli/interface';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { postService } from 'src/app/service/postService/post.service';
import { HttpClient } from '@angular/common/http';
import { httpOption, urlPost } from 'src/app/service/api.export';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  constructor(private postService: postService, private http: HttpClient) {}

  title!: string;
  body!: string;
  Allpost!: Post[];
  lenghtPost!: string | null;
  pageSize: number = 10;
  pageIndex: number = 1;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageSizeOptions: number[] = [10, 25, 50, 75];
  pageEvent!: PageEvent;
  ngOnInit(): void {
    this.getAllPost(this.pageIndex, this.pageSize);
    this.getLenght();
  }

  getAllPost(pageIndex: number, pageSize: number) {
    this.postService
      .getAllPostByIndex(this.pageIndex, this.pageSize)
      .subscribe((data: any) => {
        this.Allpost = data;
      });
  }
  onSubmit(form: NgForm) {
    const user_id = +localStorage.getItem('id')!;
    const title: string = form.value.title;
    const body: string = form.value.body;

    this.postService
      .postPost({ title: title, body: body, user: user_id }, user_id)
      .subscribe((data) => {
        this.getAllPost(this.pageIndex, this.pageSize);
      });
  }

  onSearch(form: NgForm) {
    const title = form.value.title;

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
  getLenght() {
    this.http
      .get(`${urlPost}`, {
        ...httpOption,
        observe: 'response',
      })
      .subscribe((data) => {
        this.lenghtPost = data.headers.get('x-pagination-total');
      });
  }
}
