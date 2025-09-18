import Ticket, { TicketStatus, TicketPriority } from '../domain/ticket';
import { Schema, model, Document } from 'mongoose';

interface TicketModel extends Ticket, Document {}

const ticketSchema = new Schema<TicketModel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true, enum: Object.values(TicketStatus), default: TicketStatus.OPEN },
  priority: { type: String, required: true, enum: Object.values(TicketPriority), default: TicketPriority.MEDIUM },
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
}, { timestamps: true }); // timestamps agrega createdAt y updatedAt

const ticketModel = model<TicketModel>('Ticket', ticketSchema);

export { ticketModel, TicketModel };
