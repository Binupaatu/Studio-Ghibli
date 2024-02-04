const Joi = require("joi");

const userValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email_id: Joi.string().required(),
  role: Joi.string().required(),
  full_name: Joi.string().required(),
  phone_no: Joi.any().required(),
  area_of_interests: Joi.any(),
  status: Joi.number().max(1).required(),
});

module.exports = userValidationSchema;
