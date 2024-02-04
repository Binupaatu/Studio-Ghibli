const Enrollment = require("../../models/enrollmentModel");
const Course = require("../../models/enrollmentModel");
const Joi = require("joi");

class EnrollmentService {
  async enrollUser(data) {
    const {
      customer_id,
      course_id,
      status,
      payment_method,
      payment_status,
      enrollment_date,
    } = data;
   
    try {
      const enrollment = await Enrollment.create({
        customer_id,
        course_id,
        status,
        payment_method,
        payment_status,
        enrollment_date
      });
      return enrollment;
    } 
    catch (error) {
      return error.message;
    }
  }
  async viewEnrolledUser(data) {
    try {
      const enrollment = await Enrollment.findAll({
        attributes:['id','customer_id','course_id',"status","payment_method","payment_status","enrollment_date",'created_at','updated_at']
    });

    const course = await axios(
      {
        method:'get',
        url:"http://localhost:8880/courses/"
      });
   
      const enrollments = JSON.parse(JSON.stringify(enrollment));
      const courses = JSON.parse(JSON.stringify(course.data.data));
      const userDetail = enrollments.map((enrollments) => {
      const enrollmentDetail = courses.find((c) => c.id === enrollments.course_id);
        return {
          ...enrollments,
          ...courses
        };
      });
    return enrollmentDetail;
     
    } catch (error) {
      return error.message;
    }
  }
}
module.exports = EnrollmentService;