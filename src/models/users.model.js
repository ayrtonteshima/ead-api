const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4()
  },
  name: String,
  dateOfBirth: Date,
  docType: String,
  docNumber: String,
  email: String,
  status: Number,
  password: String,
  address: {
    street: String,
    complement: String,
    country: String,
    state: String,
    city: String,
    zipcode: String,
    number: String,
  }
}, {
  timestamps: {}
});

module.exports = new mongoose.model('User', UserSchema);
