const enrollmentService = require("../services/enrollmentService");
const enrollmentValidationSchema = require("../validations/enrollmentSchema");
const service = new enrollmentService();
const Joi = require("joi");

const EnrollmentController = {
  /**
   * This function validate the given request and trigger the Enrollment Service
   * @param {*} req
   * @param {*} res
   * @returns JsonResponse
   */
  async enrollUser(req, res) {

    const { error } = enrollmentValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } 
    else {
      try {
        const course = await service.enrollUser(req.body);
        res.status(201).send({
          message: "User has been enrolled successfully",
          data: course,
        });
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error in enrollment", error: error.message });
      }
    }
  },
  async viewEnrolledUser(req, res) {
      try {
        const enroll = await service.viewEnrolledUser(req.body);
        return res.json(enroll);
        
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error in enrollment", error: error.message });
      }
    }
  
};

module.exports = EnrollmentController;