export interface ApiResponse<T> {
  isOk: boolean;
  message: string;
  data?: T;
}

export interface Client {
  _id: string;
  name: string;
  contactPerson: string;
  contactEmail: string;
}
