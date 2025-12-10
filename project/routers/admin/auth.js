const express = require("express");
const router = express.Router();
const users = require("../../models/users");
const bcrypt = require("bcrypt");
const xss = require("xss");

// sign-in GET

router.get("/admin", (req, res) => {
  res.render("admin/sign-in", { session: req.session });
});

// sign-in POST
router.post("/admin", async (req, res) => {
  try {
    const email = xss(req.body.email);
    const password = xss(req.body.password);

    const user = await users.findOne({ email });

    if (!user) {
      req.session.message = "Invalid email or password";
      return res.redirect("/admin");
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.session.message = "Invalid email or password";
      return res.redirect("/admin");
    }

    req.session.user = user;
    req.session.isAuth = true;
    req.session.role = "admin";

    return res.redirect("/admin/dashboard");
  } catch (err) {
    console.log(err);
    req.session.message = "Server error!";
    return res.redirect("/admin");
  }
});

// sign-up GET
router.get("/admin/sign-up", (req, res) => {
  res.render("admin/sign-up", { session: req.session });
});

//  sign-up POST
router.post("/admin/sign-up", async (req, res) => {
  try {
    const name = xss(req.body.name);
    const email = xss(req.body.email);
    const password = bcrypt.hashSync(req.body.password, 10);

    const exists = await users.findOne({ email });
    if (exists) {
      req.session.message = "Email already exists!";
      return res.redirect("/admin/sign-up");
    }

    const user = new users({ name, email, password });
    await user.save();

    req.session.message = "User created successfully!";
    return res.redirect("/admin");
  } catch (err) {
    console.log("error", err);
    req.session.message = "Server error!";
    return res.redirect("/admin/sign-up");
  }
});

module.exports = router;
