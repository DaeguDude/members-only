const { body, validationResult } = require("express-validator");
const User = require("../models/user");

const express = require("express");
const bcrypt = require("bcryptjs");

// GET request for become-member
exports.become_member_get = (req, res, next) => {
  res.render("become_member", { user: req.user });
};

// POST request for become-member
exports.become_member_post = [
  body("secret-code")
    .trim()
    .escape()
    .isLength({ min: 5, max: 5 })
    .withMessage("secret code is 5 characters long")
    .custom((value) => value === process.env.SECRET_CODE)
    .withMessage(
      "Secret code does not match! Think where you can find them out😉"
    ),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("become_member", {
        user: req.user,
        errors: errors.array(),
      });
    }

    const user = req.user;
    if (user.membership_status === "associate") {
      User.findByIdAndUpdate(
        user.id,
        { membership_status: "regular" },
        (err, result) => {
          if (err) {
            return res.render("become_member");
          }

          res.redirect("/");
        }
      );
    }
  },
];

// GET request for login
exports.login_get = (req, res, next) => {
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
      return res.render("login_form");
    }

    next();
  },
];

exports.logout_get = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect("/login");
  });
};

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
      // TODO: IT should return to the signup page with an error.
      // Currently signup view is not handling any errors even if it's passed
      return res.render("signup_form", errors);
    } else {
      const NUM_SALTS = 10;
      bcrypt.hash(req.body.password, NUM_SALTS, (err, hashedPassword) => {
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
          membership_status: "associate",
          admin: req.body.admin ? true : false,
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
