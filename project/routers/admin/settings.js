const express = require("express");
const router = express.Router();
const isAdmin = require("./islogged");
const users = require("../../models/users");
const xss = require("xss");
const upload = require("./upload");
const About = require("../../models/About");
const information = require("../../models/information");
const Contact = require("../../models/contact");

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

router.get("/admin/about", isAdmin, async (req, res) => {
  const about = await About.findById("693ee6cf762ca52bf1e17250");
  res.render("admin/about", { session: req.session, about: about });
});

router.post(
  "/admin/about",
  isAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { about, mail, telephone, address, hero_about } = req.body;

      const updateData = {
        about: xss(about),
        mail: xss(mail),
        telephone: xss(telephone),
        address: xss(address),
        hero_about: xss(hero_about),
        image: "/user/images/" + req.file.filename,
      };

      if (req.file) {
        updateData.image = "/user/images/" + req.file.filename;
      }

      const id = "693ee6cf762ca52bf1e17250";

      await About.findByIdAndUpdate(id, updateData);

      req.session.message = "About updated successfully!";
      return res.redirect("/admin/about");
    } catch (err) {
      console.log(err);
      req.session.message = "Server error!";
      return res.redirect("/admin/about");
    }
  }
);

router.get("/admin/information", isAdmin, async (req, res) => {
  res.render("admin/information", { session: req.session });
});

router.post("/admin/information", isAdmin, async (req, res) => {
  try {
    const {
      name,
      Birthday,
      email,
      phone,
      experiences,
      customers,
      projects,
      awards,
    } = req.body;

    const updateData = {
      name: xss(name),
      Birthday: xss(Birthday),
      email: xss(email),
      phone: xss(phone),
      experiences: xss(experiences),
      customers: xss(customers),
      projects: xss(projects),
      awards: xss(awards),
    };

    const id = "693f1d2587d877cfa6184790";

    await information.findByIdAndUpdate(id, updateData);

    req.session.message = "Information updated successfully!";
    return res.redirect("/admin/information");
  } catch (err) {
    console.log(err);
    req.session.message = "Server error!";
    return res.redirect("/admin/information");
  }
});

router.get("/admin/contact", async (req, res) => {
  const contacts = await Contact.find();
  res.render("admin/contact", { session: req.session, contacts: contacts });
});

router.post("/admin/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    let services = req.body.services || [];
    if (!Array.isArray(services)) {
      services = [services];
    }

    const contact = new Contact({
      name: xss(name),
      email: xss(email),
      message: xss(message),
      category: services.map((s) => xss(s)),
    });

    await contact.save();

    req.session.message = "Message sent successfully!";
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    req.session.message = "Server error!";
    return res.redirect("/");
  }
});

router.get("/admin/contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.render("admin/contact-details", {
      contact: contact,
      session: req.session,
    });
  } catch (err) {
    console.log(err);
    res.render("admin/contact-details", { contact: [], session: req.session });
  }
});

module.exports = router;
