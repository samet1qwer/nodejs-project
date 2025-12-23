const express = require("express");
const router = express.Router();

router.get("/admin/log-out", (req, res) => {
  req.session.destroy();
  res.redirect("/admin");
});

module.exports = router;
