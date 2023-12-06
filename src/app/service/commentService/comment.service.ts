import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpOption, urlPost, urlUser } from '../api.export';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}
  getComment(post_id: number) {
    return this.http.get(`${urlPost}/${post_id}/comments`, httpOption);
  }

  postComment(body: {}, postID: number) {
    return this.http.post(`${urlPost}/${postID}/comments`, body, httpOption);
  }
}
