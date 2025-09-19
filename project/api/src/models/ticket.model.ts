import Ticket, { TicketStatus, TicketPriority } from '../domain/ticket';
import { Schema, model, Document } from 'mongoose';

interface TicketModel extends Ticket, Document {}

const statusHistorySchema = new Schema({
    status: { type: String, required: true, enum: Object.values(TicketStatus) },
    changedAt: { type: Date, default: Date.now },
}, { _id: false });

const ticketSchema = new Schema<TicketModel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true, enum: Object.values(TicketStatus), default: TicketStatus.OPEN },
  priority: { type: String, required: true, enum: Object.values(TicketPriority), default: TicketPriority.MEDIUM },
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  clientName: { type: String, required: true },
  clientPhone: { type: String, required: true },
  clientEmail: { type: String, required: true },
  service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  assignedTo: {
    _id: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String }
  },
  statusHistory: [statusHistorySchema],
}, { timestamps: true }); // timestamps agrega createdAt y updatedAt

// Middleware para agregar el estado inicial al historial antes de guardar
ticketSchema.pre('save', function(next) {
    if (this.isNew) {
        this.statusHistory.push({ status: this.status, changedAt: new Date() });
    }
    next();
});

const ticketModel = model<TicketModel>('Ticket', ticketSchema);

export { ticketModel, TicketModel };
