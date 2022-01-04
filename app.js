const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
//Connect DB
mongoose
  .connect("mongodb://127.0.0.1:27017/smart_edu", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoCreate: true,
  })
  .then(() => {
    console.log("DB Conneted Successfuly");
  });
const app = express();

//template engine
app.set("view engine", "ejs");

global.userIN = null;

//Middlewares



app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "lorem_impsum_TTm",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/smart_edu' })
  })
);


app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});

app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
