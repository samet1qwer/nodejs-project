const express = require("express");
const router = express.Router();
const isAdmin = require("./islogged");
const users = require("../../models/users");

router.get("/admin/user-list", isAdmin, async (req, res) => {
  try {
    const allUsers = await users.find();
    res.render("admin/user-list", { users: allUsers });
  } catch (err) {
    console.log(err);
    res.render("admin/user-list", { users: [] });
  }
});

module.exports = router;
