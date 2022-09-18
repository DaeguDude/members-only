const { body, validationResult } = require("express-validator");

// GET request for become-member
exports.become_member_get = (req, res, next) => {};

// POST request for become-member
exports.become_member_post = (req, res, next) => {};

// GET request for become-admin
exports.become_admin_get = (req, res, next) => {};

// POST request for become-admin
exports.become_admin_post = (req, res, next) => {};

// GET request for login
exports.login_get = (req, res, next) => {};

// POST request for login
exports.login_post = (req, res, next) => {};

// GET request for signup
exports.signup_get = (req, res, next) => {
  res.render("signup_form");
};

// POST request for signup
exports.signup_post = [
  // VALIDATE AND SANITIZE
  body("username")
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage("Only alphanumeric value is allowed.")
    .isLength({ min: 6 })
    .withMessage("User name should be at least 6 characters")
    .isLength({ max: 30 })
    .withMessage("User name can't be more than 30 characters"),
  // TODO: Add for symbol validation too
  body("password").trim().escape().isStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    res.send("signup_post");
  },

  // Hash the password
  // And save to the DB
];
