const express = require("express")
const authController = require("../controller/authController");

const router = express.Router();

router.route('/signup').post(authController.createUser) // localhost:3000/users/singup

module.exports = router