export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export interface UserLogin {
  email?: string;
  password?: string;
}

export interface UserCreation extends UserLogin {
  name?: string;
}
