import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddUser } from 'src/app/modelli/interface';
import { httpOption, urlUser } from '../api.export';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class userService {
  provatoken: string =
    '78d9b874c8945f8b890ec61e0e4d0c5f0a64001f932e5f5c899c61b77f8aac74';

  user!: AddUser;
  constructor(private http: HttpClient) {}
  createUser(name: string, email: string, gender: string, status: string) {
    this.user = new AddUser(email, name, gender, status);
  }

  addUser(body: {}) {
    return this.http.post(urlUser, body, httpOption);
  }
  getUser() {
    return this.http.get(urlUser, httpOption);
  }

  getUserByID(idUser: Number) {
    return this.http.get(`${urlUser}/${idUser}`, httpOption);
  }

  getUserbyIndex(pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get(
      `${urlUser}?page=${pageIndex}&per_page=${pageSize}`,
      httpOption
    );
  }

  deleteUser2(idUser: Number) {
    return this.http.delete(`${urlUser}/${idUser}`, httpOption);
  }

  getUser3(input: string) {
    return this.http.get(`${urlUser}?name=${input}`, httpOption);
  }
}
