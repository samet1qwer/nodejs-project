const express = require("express");
const router = express.Router();
const isAdmin = require("./islogged");
const users = require("../../models/users");

router.get("/admin/user-list", isAdmin, async (req, res) => {
  try {
    const allUsers = await users.find();
    res.render("admin/user-list", { users: allUsers, session: req.session });
  } catch (err) {
    console.log(err);
    res.render("admin/user-list", { users: [], session: req.session });
  }
});

// edit

router.get("/admin/user-edit/:id", isAdmin, async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    res.render("admin/user-edit", { user: user });
  } catch (err) {
    console.log(err);
    res.render("admin/user-edit", { user: [] });
  }
});

router.post("/admin/user-edit/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, role } = req.body;

    const user = await users.findById(id);
    if (!user) {
      req.session.message = "User not found!";
      return res.redirect("/admin/user-list");
    }

    user.name = name;
    user.email = email;
    user.role = role;

    await user.save();

    req.session.message = "User updated successfully!";
    return res.redirect("/admin/user-list");
  } catch (err) {
    console.log(err);
    req.session.message = "Server error!";
    return res.redirect("/admin/user-list");
  }
});

module.exports = router;
