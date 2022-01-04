const mongoose = require("mongoose");
const Scheama = mongoose.Schema;
const slugify = require("slugify");

const CategoryScheama = new Scheama({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});
CategoryScheama.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Category = mongoose.model("Category", CategoryScheama);
module.exports = Category;
