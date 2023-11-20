import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../modelli/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: string =
    '78d9b874c8945f8b890ec61e0e4d0c5f0a64001f932e5f5c899c61b77f8aac74';
  urlPost: any = 'https://gorest.co.in/public/v2/posts';
  urlUser: any = 'https://gorest.co.in/public/v2/users';
  user!: User;
  constructor(private http: HttpClient) {}

  createUser(name: string, email: string, gender: string, status: string) {
    this.user = new User(name, email, gender, status);
  }

  addUser(body: {}) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const httpOption = { headers: headers };
    return this.http.post(this.urlUser, body, httpOption);
  }

  getUser() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const httpOption = { headers: headers };
    return this.http.get(this.urlUser, httpOption);
  }

  getUser2(idUser: Number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const httpOption = { headers: headers };
    return this.http.get(
      `https://gorest.co.in/public/v2/users/${idUser}`,
      httpOption
    );
  }

  getUser4(pageIndex: number, pageSize: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const httpOption = { headers: headers };
    return this.http.get(
      `${this.urlUser}?page=${pageIndex}&per_page=${pageSize}`,
      httpOption
    );
  }

  deleteUser2(idUser: Number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const httpOption = { headers: headers };
    return this.http.delete(
      `https://gorest.co.in/public/v2/users/${idUser}`,
      httpOption
    );
  }

  getUser3(input: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const httpOption = { headers: headers };
    return this.http.get(
      `https://gorest.co.in/public/v2/users?name=${input}`,
      httpOption
    );
  }
  getPost3(pageIndex: number, pageSize: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const httpOption = { headers: headers };
    return this.http.get(
      `${this.urlPost}?page=${pageIndex}&per_page=${pageSize}`,
      httpOption
    );
  }

  postPost(body: {}, idUser: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const httpOption = { headers: headers };
    return (
      this,
      this.http.post(
        `https://gorest.co.in/public/v2/users/${idUser}/posts`,
        body,
        httpOption
      )
    );
  }

  getPost4(input: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const httpOption = { headers: headers };
    return this.http.get(
      `https://gorest.co.in/public/v2/posts?title=${input}`,
      httpOption
    );
  }

  getComment(post_id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const httpOption = { headers: headers };
    return this.http.get(
      `https://gorest.co.in/public/v2/posts/${post_id}/comments`,
      httpOption
    );
  }

  postComment(body: {}, postID: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const httpOption = { headers: headers };
    return this.http.post(
      `https://gorest.co.in/public/v2/posts/${postID}/comments`,
      body,
      httpOption
    );
  }
  getPost2(userId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const httpOption = { headers: headers };
    return this.http.get(
      `https://gorest.co.in/public/v2/users/${userId}/posts`,
      httpOption
    );
  }
}
