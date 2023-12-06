export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public gender: string,
    public status: string
  ) {}
}

export class AddUser {
  constructor(
    public email: string,
    public name: string,
    public gender: string,
    public status: string
  ) {}
}

export class Comment {
  constructor(
    public body: string,
    public email: string,
    public id: number,
    public name: string,
    public post_id: number
  ) {}
}

export class Post {
  constructor(
    public id: number,
    public user_id: number,
    public title: string,
    public body: string
  ) {}
}
