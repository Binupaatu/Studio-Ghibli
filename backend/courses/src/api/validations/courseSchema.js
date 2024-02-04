const Joi = require("joi");

const courseValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  learning_outcomes: Joi.any(),
  course_inclusions: Joi.any(),
  is_certified: Joi.number().max(1).required(),
  author: Joi.string().required(),
  status: Joi.number().max(1).required(),
  rating: Joi.number().min(0).required(),
  total_enrollments: Joi.number().min(0).required(),
  chapters: Joi.any(),
});

module.exports = courseValidationSchema;
