const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/create", courseController.createCourse);
router.put("/:id", courseController.editCourse);

module.exports = router;
