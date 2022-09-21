const { body, validationResult } = require("express-validator");
const User = require("../models/user");

const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(function verify(username, password, done) {
    // Find user
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      // GOAL: I implemented to hash the password when user signs up
      // Now my goal is to implement check the username and hashed password
      // that is stored in the db, with the username and password that they
      // are going to pass in when login.

      // Checkout Comparing hashed passwords in TOP: https://www.theodinproject.com/lessons/nodejs-authentication-basics
      // TODO: Replace this conditional with bcrypt.compare function
      //

      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// GET request for become-member
exports.become_member_get = (req, res, next) => {};

// POST request for become-member
exports.become_member_post = (req, res, next) => {};

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
      console.log("error!");
      res.render("login_form");
    }

    next();
    // There is no problem. Go to next.
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
  (req, res, next) => {
    const errors = validationResult(req);
    console.log("hey");

    // 에러가 발생하였다면...
    if (!errors.isEmpty()) {
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

    // Hash the password
    // And save to the DB

    // res.send("signup_post");
  },
];
