import { HttpHeaders } from '@angular/common/http';

export const token: string = localStorage.getItem('token')!;

const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`,
});
export const httpOption = { headers: headers };

export const urlPost: string = 'https://gorest.co.in/public/v2/posts';
export const urlUser: string = 'https://gorest.co.in/public/v2/users';
