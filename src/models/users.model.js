const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');


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

module.exports = model('User', UserSchema);
