import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { userService } from 'src/app/service/userService/user.service';
import { User } from 'src/app/modelli/interface';

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

  photoGirl2: string =
    'https://media.istockphoto.com/id/1222666476/it/vettoriale/donna-divertente-che-more-i-capelli-a-casa-vector.jpg?s=612x612&w=0&k=20&c=IrBrTs24crgvdIuWGiLGqYDchzvIZeuJEavVlHIhqdc=';
  photoMan2: string =
    'https://media.istockphoto.com/id/1349231567/it/vettoriale/personaggio-in-stile-anime-del-giovane-uomo-anime-ragazzo-vettoriale.jpg?s=612x612&w=0&k=20&c=og5UTl4H2bTTuqLDA9cHoYikk9pzYYgHxR1ZhWaopS4=';
  users!: User[];
  constructor(public dialog: MatDialog, private userService: userService) {}
  ngOnInit(): void {
    this.getAllUser(this.pageIndex, this.pageSize);
  }

  getAllUser(pageIndex: number, pageSize: number) {
    this.userService
      .getUserbyIndex(pageIndex, pageSize)
      .subscribe((data: any) => {
        this.users = data;
        this.lenghtPost = pageSize;
      });
  }

  openDialog() {
    this.dialog.open(CreateUserComponent);
  }

  onSearch(form: NgForm) {
    const title = form.value.title;
    this.userService.getUserBySearch(title).subscribe((data: any) => {
      this.users = data;
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
