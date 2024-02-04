const Joi = require("joi");

const customerValidationSchema = Joi.object({
  user_id: Joi.number().required(),
  full_name: Joi.string().required(),
  phone_no: Joi.any(),
  area_of_interests: Joi.any(),
  status: Joi.number().max(1).required(),
});

module.exports = customerValidationSchema;
