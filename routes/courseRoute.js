const express = require("express")
const courseController = require("../controller/courseController");
const roleMiddleware = require ('../middlewares/roleMiddleware')
const router = express.Router();

router.route('/').post(roleMiddleware(["teacher","admin"]),courseController.createCourse) // localhost:3000/courses
router.route('/').get(courseController.getAllCourses) // localhost:3000/courses
router.route('/:slug').delete(courseController.deleteCourse) // localhost:3000/courses
router.route('/:slug').put(courseController.updateCourse) // localhost:3000/courses
router.route('/:slug').get(courseController.getCourse) // localhost:3000/courses/$id
router.route('/enroll').post(courseController.enrollCourse) // localhost:3000/courses
router.route('/release').post(courseController.releaseCourse) // localhost:3000/courses

module.exports = router