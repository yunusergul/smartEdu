const express = require("express");
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");

//Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/smart_edu").then(() => {
  console.log("DB Conneted Successfuly");
});
const app = express();

//template engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", pageRoute);
app.use("/courses", courseRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
