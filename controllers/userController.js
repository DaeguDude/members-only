const { body, validationResult } = require("express-validator");
const User = require("../models/user");

const express = require("express");
const bcrypt = require("bcryptjs");

// GET request for become-member
exports.become_member_get = (req, res, next) => {
  // TODO: Show a join the club page

  res.render("become_member", { user: req.user });
};

// POST request for become-member
exports.become_member_post = (req, res, next) => {
  console.log("POST become_member: ");
};

// GET request for become-admin
exports.become_admin_get = (req, res, next) => {};

// POST request for become-admin
exports.become_admin_post = (req, res, next) => {};

// GET request for login
exports.login_get = (req, res, next) => {
  // TODO: Documentation starts from login and logout. So Let's first implement that page....
  // (O)Create a view for login page
  // (~)Implement functionality for login.
  // Implement functionality for logout.
  // IMplement functionality for signup

  res.render("login_form");
};

// POST request for login
exports.login_post = [
  body("username")
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage("Only alphanumeric value is allowed.")
    .isLength({ min: 6 })
    .withMessage("User name should be at least 6 characters")
    .isLength({ max: 30 })
    .withMessage("User name can't be more than 30 characters"),
  body("password").trim().escape().isStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log("yo");

    if (!errors.isEmpty()) {
      res.render("login_form");
    }

    next();
  },
];

// GET request for signup
exports.signup_get = (req, res, next) => {
  res.render("signup_form");
};

// POST request for signup
exports.signup_post = [
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
  body("confirm-password")
    .exists()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password should match"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("there was an error: ", errors);
    } else {
      const NUM_SALTS = 10;
      bcrypt.hash(req.body.password, NUM_SALTS, (err, hashedPassword) => {
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
          membership_status: "associate",
          admin: false,
        });

        user.save(function (err) {
          if (err) {
            return next(err);
          }

          res.redirect("/");
        });
      });
    }
  },
];
