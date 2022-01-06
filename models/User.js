const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Scheama = mongoose.Schema;

const UserScheama = new Scheama({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    enum:["student","teacher","admin"],
    default:"student"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
UserScheama.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});
const Course = mongoose.model("Users", UserScheama);
module.exports = Course;
