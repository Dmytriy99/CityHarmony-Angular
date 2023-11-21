import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  idUser: number = +localStorage.getItem('id')!;
  name: string | undefined;

  constructor(private apiservice: ApiService, private route: Router) {}
  ngOnInit(): void {
    console.log('ciao');
    this.apiservice.getUser2(this.idUser).subscribe((data) => {
      console.log(data);
      this.apiservice.getUser2(this.idUser).subscribe((data: any) => {
        this.name = data.name;
      });
    });
  }
  logOut() {
    localStorage.removeItem('isLog');
    this.route.navigate(['register']);
  }
}
