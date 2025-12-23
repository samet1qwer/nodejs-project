const users = require("../../models/users");
const About = require("../../models/About");
const Information = require("../../models/information");
const Contact = require("../../models/contact");
const xss = require("xss");

// ================= USERS =================

exports.userList = async (req, res) => {
  try {
    const allUsers = await users.find();
    res.render("admin/user-list", {
      users: allUsers,
      session: req.session,
    });
  } catch (err) {
    console.log(err);
    res.render("admin/user-list", {
      users: [],
      session: req.session,
    });
  }
};

exports.userEditPage = async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    res.render("admin/user-edit", { user });
  } catch (err) {
    console.log(err);
    res.render("admin/user-edit", { user: null });
  }
};

exports.userEdit = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await users.findById(req.params.id);

    if (!user) {
      req.session.message = "User not found!";
      return res.redirect("/admin/user-list");
    }

    user.name = xss(name);
    user.email = xss(email);
    user.role = role;

    await user.save();

    req.session.message = "User updated successfully!";
    res.redirect("/admin/user-list");
  } catch (err) {
    console.log(err);
    req.session.message = "Server error!";
    res.redirect("/admin/user-list");
  }
};

// ================= ABOUT =================

exports.aboutPage = async (req, res) => {
  const about = await About.findById("693ee6cf762ca52bf1e17250");
  res.render("admin/about", {
    about,
    session: req.session,
  });
};

exports.aboutUpdate = async (req, res) => {
  try {
    const { about, mail, telephone, address, hero_about } = req.body;

    const updateData = {
      about: xss(about),
      mail: xss(mail),
      telephone: xss(telephone),
      address: xss(address),
      hero_about: xss(hero_about),
    };

    if (req.file) {
      updateData.image = "/user/images/" + req.file.filename;
    }

    await About.findByIdAndUpdate("693ee6cf762ca52bf1e17250", updateData);

    req.session.message = "About updated successfully!";
    res.redirect("/admin/about");
  } catch (err) {
    console.log(err);
    req.session.message = "Server error!";
    res.redirect("/admin/about");
  }
};

// ================= INFORMATION =================

exports.informationPage = async (req, res) => {
  const information = await Information.findById("693f1d2587d877cfa6184790");

  res.render("admin/information", {
    information,
    session: req.session,
  });
};

exports.informationUpdate = async (req, res) => {
  try {
    const updateData = {
      name: xss(req.body.name),
      Birthday: xss(req.body.Birthday),
      email: xss(req.body.email),
      phone: xss(req.body.phone),
      experiences: xss(req.body.experiences),
      customers: xss(req.body.customers),
      projects: xss(req.body.projects),
      awards: xss(req.body.awards),
    };

    await Information.findByIdAndUpdate("693f1d2587d877cfa6184790", updateData);

    req.session.message = "Information updated successfully!";
    res.redirect("/admin/information");
  } catch (err) {
    console.log(err);
    req.session.message = "Server error!";
    res.redirect("/admin/information");
  }
};

// ================= CONTACT =================

exports.contactList = async (req, res) => {
  const contacts = await Contact.find();
  res.render("admin/contact", {
    contacts,
    session: req.session,
  });
};

exports.contactDetail = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("admin/contact-details", {
    contact,
    session: req.session,
  });
};

exports.contactStatus = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    contact.status = req.body.status;
    await contact.save();

    req.session.message = "Status updated successfully!";
    res.redirect(`/admin/contact/${req.params.id}`);
  } catch (err) {
    console.log(err);
    req.session.message = "Server error!";
    res.redirect(`/admin/contact/${req.params.id}`);
  }
};
