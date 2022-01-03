const mongoose = require("mongoose");
const Scheama = mongoose.Schema;
const slugify = require("slugify");

const CourseScheama = new Scheama({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
});
CourseScheama.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Course = mongoose.model("Course", CourseScheama);
module.exports = Course;
