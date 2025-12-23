const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
// mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/portfolio")
  .then(() => {
    console.log("Mongoose is connected");
  })
  .catch((err) => console.log("mongoose connection error:", err));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/user")));
app.use(express.static(path.join(__dirname, "public/admin")));

const AboutMe = require("./models/aboutMe");
const users = require("./models/users");
const About = require("./models/About");
const Information = require("./models/information");
const Contact = require("./models/contact");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session

const session = require("express-session");

app.use(
  session({
    secret: "samet-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// routers
const userRouter = require("./routers/user/user");
const adminRouter = require("./routers/admin/auth");
const { type } = require("os");
const dashboard = require("./routers/admin/dashbord");
const settings = require("./routers/admin/settings");
const logout = require("./routers/admin/logout");
app.use(userRouter);
app.use(adminRouter);
app.use(dashboard);
app.use("/admin", settings);
app.use(logout);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
