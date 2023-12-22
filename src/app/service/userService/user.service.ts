import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddUser } from 'src/app/modelli/interface';
import { httpOption, urlUser } from '../api.export';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class userService {
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

  getUserBySearch(input: string) {
    return this.http.get(`${urlUser}?name=${input}`, httpOption);
  }
  getUserBySearchEmail(input: string) {
    return this.http.get(`${urlUser}?email=${input}`, httpOption);
  }
}
