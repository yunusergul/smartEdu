const User = require("../models/User");
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

exports.loginUser =  (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
     User.findOne({ email }, (err, user) => {
      if (user) {
        console.log(user);
        bcrypt.compare(password, user.password, (err, same) => {
          console.log(same);
          if (same) {
            req.session.userID = user._id;
            res.status(200).redirect('/')
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
  req.session.destroy(()=> {
    res.redirect('/');
  })
}