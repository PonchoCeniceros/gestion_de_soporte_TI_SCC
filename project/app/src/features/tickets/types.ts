export interface ApiResponse<T> {
  isOk: boolean;
  message: string;
  data?: T;
}

export enum TicketStatus {
  OPEN = 'abierto',
  IN_PROGRESS = 'en_progreso',
  CLOSED = 'cerrado',
}

export enum TicketPriority {
  LOW = 'baja',
  MEDIUM = 'media',
  HIGH = 'alta',
  URGENT = 'urgente',
}

export interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  client: Client;
  service: Service;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  _id: string;
  name: string;
  contactPerson: string;
  contactEmail: string;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
}
