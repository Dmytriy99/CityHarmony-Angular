export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

// export interface AddUser {
//   email: string;
//   name: string;
//   gender: string;
//   status: string;
// }

export interface Comment {
  body: string;
  email: string;
  id: number;
  name: string;
  post_id: number;
}

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export class AddUser {
  constructor(
    public email: string,
    public name: string,
    public gender: string,
    public status: string
  ) {}
}
