const Joi = require("joi");

const enrollmentValidationSchema = Joi.object({
    customer_id: Joi.number().min(0).required(),
    course_id:Joi.number().min(0).required(),
    enrollment_date: Joi.date(),
    payment_method: Joi.string().required(),
    payment_status: Joi.number().min(0).required(),
    status: Joi.number().max(1).required()
});

module.exports = enrollmentValidationSchema;
