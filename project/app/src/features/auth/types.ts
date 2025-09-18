export interface ApiResponse<T> {
  isOk: boolean;
  message: string;
  data?: T;
}

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export interface User {
  name: string;
  password: string;
}

export interface Session {
  token: string;
  expiresAt: number;
  role: Role;
}
