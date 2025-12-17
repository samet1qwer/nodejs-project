const express = require("express");
const router = express.Router();
const about = require("../../models/About");
const information = require("../../models/information");

router.get("/", async (req, res) => {
  const aboutData = await about.findById("693ee6cf762ca52bf1e17250");
  const informationData = await information.findById(
    "693f1d2587d877cfa6184790"
  );
  res.render("user/home", {
    session: req.session,
    about: aboutData,
    information: informationData,
  });
});

module.exports = router;
