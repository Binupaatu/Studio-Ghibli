const CourseService = require("../services/courseService");
const courseService = require("../services/courseService");
const courseValidationSchema = require("../validations/courseSchema");
const service = new courseService();

const CourseController = {
  /**
   * This function validate the given request and trigger the Course Service
   * @param {*} req
   * @param {*} res
   * @returns JsonResponse
   */
  async createCourse(req, res) {
    const { error } = courseValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      try {
        const course = await service.createCourse(req.body);
        res.status(201).send({
          message: "Course has been created successfully",
          data: course,
        });
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error creating Course", error: error.message });
      }
    }
  },
  async editCourse(req, res) {
    const { error } = courseValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      try {
        const courseId = req.params.id;
        const updateCourse = service.editCourse(courseId, req.body);
        res.status(201).send({
          message: "Course has been updated successfully",
          data: updateCourse,
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  },
};

module.exports = CourseController;
