const express = require("express");
const router = express.Router();
const about = require("../../models/aboutMe");

router.get("/admin", (req, res) => {
  res.render("admin/sign-in");
});

router.post("/admin", (req, res) => {
  const data = req.body;
  console.log("lorem", data.email, data.password);

  about
    .find({ email: data.email, password: data.password })
    .then((result) => {
      if (result.length > 0) {
        res.render("admin/home");
      } else {
        res.render("admin/sign-in", {
          message: "Invalid email or password",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/admin/sign-up", (req, res) => {
  res.render("admin/sign-up");
});
module.exports = router;
