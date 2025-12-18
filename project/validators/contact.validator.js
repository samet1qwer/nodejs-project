const { body } = require("express-validator");

exports.contactValidator = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Please enter your name")
    .length({
      min: 3,
      max: 20,
    })
    .withMessage("Name must be between 3 and 20 characters"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Please enter your email")
    .isEmail()
    .withMessage("Please enter a valid email"),
  body("message").not().isEmpty().withMessage("Please enter your message"),
  body("services")
    .not()
    .isEmpty()
    .withMessage("Please select at least one service"),
];
