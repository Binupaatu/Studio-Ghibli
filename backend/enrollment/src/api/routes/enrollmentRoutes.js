const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", enrollmentController.enrollUser);
router.get("/", enrollmentController.viewEnrolledUser);
module.exports = router;