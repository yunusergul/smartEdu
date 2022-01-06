const Course = require("../models/Course");
const Category = require("../models/Category");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).redirect('/courses')
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.cat;
    const category = await Category.findOne({slug:categorySlug})
    let filter= {}
    if(categorySlug ){
      filter={category : category._id}
    }
    const courses = await Course.find(filter).sort('-createdAt');;
    const categories = await Category.find({})
    res.status(200).render("courses", { 
        courses,
        categories,
        page_name: "courses",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({slug:req.params.slug});
    const categories = await Category.find({})
    res.status(200).render("course-single", { 
        course,
        categories,
        page_name: "courses",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};
