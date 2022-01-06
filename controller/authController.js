const User = require("../models/User");
const Category = require("../models/Category");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/");
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

exports.loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            req.session.userID = user._id;
            res.status(200).redirect("/users/dashboard");
          }
        });
      }
    }); // => "email: email" kısaltması olarak sadece "email" yazıyoruz
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getdashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  const categories = await Category.find({});
  console.log(user);
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
  });
};
