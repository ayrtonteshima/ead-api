import mongoose, { model as Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  name: String,
  dateOfBirth: Date,
  docType: String,
  docNumber: String,
  email: String,
  status: Boolean,
  password: String,
  address: {
    street: String,
    complement: String,
    country: String,
    state: String,
    city: String,
    zipcode: String,
    number: String,
  },
}, {
  timestamps: {},
});

export default new Model('User', UserSchema);
