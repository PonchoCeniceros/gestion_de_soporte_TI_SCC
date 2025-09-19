import { Types } from 'mongoose';

/**
 * Define los posibles estados de un ticket.
 */
export enum TicketStatus {
  OPEN = 'abierto',
  IN_PROGRESS = 'en_progreso',
  CLOSED = 'cerrado',
}

/**
 * Define los niveles de prioridad de un ticket.
 */
export enum TicketPriority {
  LOW = 'baja',
  MEDIUM = 'media',
  HIGH = 'alta',
  URGENT = 'urgente',
}

/**
 * Representa una entrada en el historial de cambios de estado.
 */
export interface StatusHistory {
  status: TicketStatus;
  changedAt: Date;
}

/**
 * Representa un usuario asignado a un ticket, incluyendo su ID y nombre.
 */
export interface AssignedUser {
  _id: Types.ObjectId;
  name: string;
}

/**
 * Representa un ticket de servicio en el dominio.
 */
export default interface Ticket {
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  client: Types.ObjectId; // Referencia a un Cliente
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  service: Types.ObjectId; // Referencia a un Servicio
  assignedTo?: AssignedUser; // Referencia a un Usuario
  statusHistory: StatusHistory[];
  createdAt: Date;
  updatedAt: Date;
}
