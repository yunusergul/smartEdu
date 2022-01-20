const Course = require("../models/Course");
const User = require("../models/User");
const nodemailer = require("nodemailer");

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getIndexPage = async (req, res) => {
  const courses =  await Course.find().sort('-createdAt').limit(2)
  const totalCourses = await Course.find().countDocuments();
  const totalStudents  = await User.find().countDocuments({role : 'student'});
  const totalTeachers = await User.find().countDocuments({role : 'teacher'});
  res.status(200).render("index", {
    page_name: "index",
    courses,
    totalCourses,
    totalStudents,
    totalTeachers
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

exports.getcontactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
    <h1>Messsage Detail</h1>
    <ul>
    <li>${req.body.name}</li>
    <li>${req.body.email}</li>
    </ul>
    <h1>Massege</h1>
    <p>${req.body.massage}</p>
  `;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "yunuscode@gmail.com", // gmail hesabı
        pass: "dptsgirxmbhgdzor", // gmail şifresi veya uygulama şifresi
      },
    });
    let info = await transporter.sendMail({
      from: '"Smart EDU Contact From"<yunuscode@gmail.com>',
      to: "yunusergul97@gmail.com",
      subject: "Smart EDU Contact Form New Message",
      html: outputMessage,
    });
    console.log("massega send %s", info.messageId);
    console.log("Preview URL %s", nodemailer.getTestMessageUrl(info));

    req.flash("success", "We Received your massage succesfully");
    res.status(200).redirect("contact");
  } catch(err) {
    req.flash("error", `Something Happened! ${err}`);
    res.status(200).redirect("contact");
  }
};
