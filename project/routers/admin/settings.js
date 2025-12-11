const express = require("express");
const router = express.Router();
const isAdmin = require("./islogged");
const users = require("../../models/users");

router.get("/admin/settings", isAdmin, (req, res) => {
  async () => {
    const allUsers = await users.find();
    if (allUsers) {
      res.render("admin/settings", { users: allUsers });
    } else {
      res.render("admin/settings");
    }
  };
});

module.exports = router;
