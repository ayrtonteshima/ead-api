const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  name: String,
  email: String,
  password: String,
  birthDate: Date,
  docType: String,
  docNumber: String,
  status: Boolean,
  address: {
    country: String,
    state: String,
    city: String,
    zipCode: String,
    street: String,
    number: String,
    complement: String,
  },
}, {
  timestamps: {},
});

module.exports = new mongoose.model('User', UserSchema);
