const express = require("express");
const router = express.Router();
const isAdmin = require("./islogged");

router.get("/admin/dashboard", isAdmin, (req, res) => {
  res.render("admin/dashboard", { session: req.session });
});

module.exports = router;
