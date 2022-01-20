const express = require("express");
const authController = require("../controller/authController");
const authMiddleware = require("../middlewares/authMiddlewares");
const { body } = require("express-validator");
const User = require('../models/User')
const router = express.Router();

router.route("/signup").post(
  [
    body("name").not().isEmpty().withMessage("Please Enter Your Name"),
    body("email")
      .isEmail()
      .withMessage("Please Enter Valid Email")
      .custom((userEmail) => {
        return userEmail.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject("Email is Already exists!");
          }
        });
      }),
    body("password").not().isEmpty().withMessage("Please Enter A password"),
  ],
  authController.createUser
); // localhost:3000/users/singup
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/dashboard").get(authMiddleware, authController.getdashboardPage);
router.route('/:id').delete(authController.deleteUser);
module.exports = router;
