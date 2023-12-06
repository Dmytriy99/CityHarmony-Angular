import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpOption, urlPost, urlUser } from '../api.export';

@Injectable({
  providedIn: 'root',
})
export class postService {
  provatoken: string =
    '78d9b874c8945f8b890ec61e0e4d0c5f0a64001f932e5f5c899c61b77f8aac74';
  constructor(private http: HttpClient) {}
  postPost(body: {}, idUser: number) {
    return this, this.http.post(`${urlUser}/${idUser}/posts`, body, httpOption);
  }

  getBySearch(input: string) {
    return this.http.get(`${urlPost}?title=${input}`, httpOption);
  }

  getAllPostByIndex(pageIndex: number, pageSize: number) {
    return this.http.get(
      `${urlPost}?page=${pageIndex}&per_page=${pageSize}`,
      httpOption
    );
  }
  getPostById(userId: number) {
    return this.http.get(`${urlUser}/${userId}/posts`, httpOption);
  }
}
