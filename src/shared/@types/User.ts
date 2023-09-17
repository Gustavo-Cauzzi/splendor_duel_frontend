export interface User {
  username: string;
  id?: string;
}

export interface FakeUser extends User {
  isFakeUser: true;
}

export type UiUser = User & FakeUser;
