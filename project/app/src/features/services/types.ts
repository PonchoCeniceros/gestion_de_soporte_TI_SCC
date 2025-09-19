export interface ApiResponse<T> {
  isOk: boolean;
  message: string;
  data?: T;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
}
