import Service from '../domain/service';
import { Schema, model, Document } from 'mongoose';

interface ServiceModel extends Service, Document {}

const serviceSchema = new Schema<ServiceModel>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

const serviceModel = model<ServiceModel>('Service', serviceSchema);

export { serviceModel, ServiceModel };
