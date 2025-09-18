import Client from '../domain/client';
import { Schema, model, Document } from 'mongoose';

interface ClientModel extends Client, Document {}

const clientSchema = new Schema<ClientModel>({
  name: { type: String, required: true, unique: true },
  contactPerson: { type: String, required: true },
  contactEmail: { type: String, required: true },
});

const clientModel = model<ClientModel>('Client', clientSchema);

export { clientModel, ClientModel };
