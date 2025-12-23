const express = require("express");
const router = express.Router();
const isAdmin = require("./islogged");

const settingsController = require("../../controllers/admin/settings.controller");

// USERS
router.get("/user-list", isAdmin, settingsController.userList);
router.get("/user-edit/:id", isAdmin, settingsController.userEditPage);
router.post("/user-edit/:id", isAdmin, settingsController.userEdit);

// ABOUT
router.get("/about", isAdmin, settingsController.aboutPage);
router.post("/about", isAdmin, settingsController.aboutUpdate);

// INFORMATION
router.get("/information", isAdmin, settingsController.informationPage);
router.post("/information", isAdmin, settingsController.informationUpdate);

// CONTACT
router.get("/contact", isAdmin, settingsController.contactList);
router.get("/contact/:id", isAdmin, settingsController.contactDetail);
router.post("/contact/status/:id", isAdmin, settingsController.contactStatus);

module.exports = router;
