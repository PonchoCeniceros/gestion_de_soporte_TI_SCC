export interface ApiResponse<T> {
  isOk: boolean;
  message: string;
  data?: T;
}

export enum ClientClass {
  EXTERNAL = 'cliente_externo',
  INTERNAL = 'cliente_interno',
  BRANCH = 'sucursal',
}

export interface Client {
  _id: string;
  name: string;
  contactPerson: string;
  contactEmail: string;
  class: ClientClass;
}
