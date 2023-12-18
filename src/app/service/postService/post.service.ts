import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpOption, urlPost, urlUser } from '../api.export';

@Injectable({
  providedIn: 'root',
})
export class postService {
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
  getheaders() {
    return this.http.get(`${urlPost}`, { ...httpOption, observe: 'response' });
  }
}
