const { body } = require("express-validator");

exports.contactValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Please enter your name")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be between 3 and 20 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Please enter your email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("message").trim().notEmpty().withMessage("Please enter your message"),

  body("services").custom((value) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      throw new Error("Please select at least one service");
    }
    return true;
  }),
];
