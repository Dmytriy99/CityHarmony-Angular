import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  error!: string;
  idLocal = localStorage.getItem('id');
  constructor(private apiService: ApiService, private route: Router) {}
  ngOnInit(): void {
    console.log(this.idLocal);
  }
  onSubmit(form: NgForm) {
    const idUser = form.value.id;
    this.apiService
      .getUser2(idUser)
      .pipe(catchError(() => of(this.error)))
      .subscribe((data: any) => {
        if (data.id == this.idLocal) {
          localStorage.setItem('isLog', 'true');
          this.route.navigate(['/posts']);
        } else {
          this.error = 'Utente non trovato';
        }
      });
  }
}
