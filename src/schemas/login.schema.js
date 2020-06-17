import Joi from '@hapi/joi';

export default Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
