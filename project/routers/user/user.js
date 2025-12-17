const express = require("express");
const router = express.Router();
const about = require("../../models/About");

router.get("/", async (req, res) => {
  const aboutData = await about.findById("693ee6cf762ca52bf1e17250");
  res.render("user/home", { session: req.session, about: aboutData });
});

module.exports = router;
