import User from '../domain/user';
import { Role } from '../domain/role';
import { Schema, model, Document } from 'mongoose';

/**
 *
 */
interface UserModel extends User, Document { }

/**
 *
 */
const userSchema = new Schema<UserModel>({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: Object.values(Role) },
});

/**
 *
 */
const userModel = model<UserModel>('User', userSchema);

export { userModel, UserModel };
