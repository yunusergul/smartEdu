const express = require("express")
const courseController = require("../controller/courseController");
const roleMiddleware = require ('../middlewares/roleMiddleware')
const router = express.Router();

router.route('/').post(roleMiddleware(["teacher","admin"]),courseController.createCourse) // localhost:3000/courses
router.route('/').get(courseController.getAllCourses) // localhost:3000/courses
router.route('/:slug').get(courseController.getCourse) // localhost:3000/courses/$id
module.exports = router