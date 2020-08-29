const Joi = require('@hapi/joi');

module.exports = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  birthDate: Joi.date().iso(),
  docType: Joi.string(),
  docNumber: Joi.string().min(3),
  status: Joi.string(),
  address: {
    country: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    zipCode: Joi.string(),
    street: Joi.string(),
    number: Joi.string(),
    complement: Joi.string(),
  },
  timestamps: Joi.any().forbidden(),
});
