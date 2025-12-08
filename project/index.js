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

app.set("views", "./views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/user")));
app.use(express.static(path.join(__dirname, "public/admin")));

const AboutMe = require("./models/aboutMe");
const users = require("./models/users");

const user = new users({
  name: "samet",
  email: "samet@gmail.com",
  password: "1234",
  role: "admin",
});
const save = async () => {
  try {
    const result = await about.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
save();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routers
const userRouter = require("./routers/user/user");
const adminRouter = require("./routers/admin/auth");
const { type } = require("os");

app.use(userRouter);
app.use(adminRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
