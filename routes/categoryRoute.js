const express = require("express")
const categoryController = require("../controller/categoryController");

const router = express.Router();
router.route('/:id').delete(categoryController.deleteCategory) // localhost:3000/category
router.route('/').post(categoryController.createCategory) // localhost:3000/category
module.exports = router