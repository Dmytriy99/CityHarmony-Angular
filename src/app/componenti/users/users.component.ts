import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  lenghtPost: number = 75;
  pageSize: number = 10;
  pageIndex: number = 1;
  pageSizeOptions: number[] = [10, 25, 50, 75];
  pageEvent!: PageEvent;

  photoMan: string =
    'https://cdn.pixabay.com/photo/2022/03/12/03/20/man-7063278_1280.jpg';
  photoGirl: string =
    'https://cdn.pixabay.com/photo/2022/09/21/09/47/woman-7469901_1280.png';
  photoGirl2: string =
    'https://media.istockphoto.com/id/1222666476/it/vettoriale/donna-divertente-che-more-i-capelli-a-casa-vector.jpg?s=612x612&w=0&k=20&c=IrBrTs24crgvdIuWGiLGqYDchzvIZeuJEavVlHIhqdc=';
  photoMan2: string =
    'https://media.istockphoto.com/id/1349231567/it/vettoriale/personaggio-in-stile-anime-del-giovane-uomo-anime-ragazzo-vettoriale.jpg?s=612x612&w=0&k=20&c=og5UTl4H2bTTuqLDA9cHoYikk9pzYYgHxR1ZhWaopS4=';
  users: any;
  constructor(private apiService: ApiService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getAllUser(this.pageIndex, this.pageSize);
  }

  getAllUser(pageIndex: number, pageSize: number) {
    this.apiService
      .getUser4(this.pageIndex, this.pageSize)
      .subscribe((data) => {
        this.users = data;
        this.lenghtPost = pageSize;
      });
  }

  openDialog() {
    this.dialog.open(CreateUserComponent);
  }

  onSearch(form: NgForm) {
    const title = form.value.title;
    console.log(title);
    this.apiService.getUser3(title).subscribe((data: any) => {
      this.users = data;
      console.log(data);
    });
  }
  back() {
    window.location.reload();
  }
  selectPage(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getAllUser(this.pageIndex, this.pageSize);
  }
}
