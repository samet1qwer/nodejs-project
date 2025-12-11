function isAdmin(req, res, next) {
  try {
    if (!req.session || !req.session.isAuth) {
      req.session.message = "Please log in first.";
      return res.redirect("/admin");
    }

    if (req.session.role !== "admin") {
      req.session.message = "You are not authorized!";
      return res.redirect("/admin", { session: req.session });
    }
    next();
  } catch (err) {
    console.log("Middleware error:", err);
    req.session.message = "Unexpected error!";
    return res.redirect("/admin", { session: req.session });
  }
}

module.exports = isAdmin;
