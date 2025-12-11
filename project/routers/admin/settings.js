const express = require("express");
const router = express.Router();
const isAdmin = require("./islogged");
const users = require("../../models/users");

router.get("/admin/settings", isAdmin, async (req, res) => {
  try {
    const allUsers = await users.find();
    res.render("admin/settings", { users: allUsers });
  } catch (err) {
    console.log(err);
    res.render("admin/settings", { users: [] });
  }
});

module.exports = router;
