var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/userController");

var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var crypto = require("crypto");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/create-post", function (req, res, next) {
  res.send("NOT IMPLEMENTED: GET create-post");
});
router.post("/create-post", function (req, res, next) {
  res.send("NOT IMPLEMENTED: POST create-post");
});
router.delete("/post/:id", function (req, res, next) {
  res.send("NOT IMPLEMENTED: DELETE post");
});

router.get("/become-member", function (req, res, next) {
  res.send("NOT IMPLEMENTED: GET become-member");
});
router.post("/become-member", function (req, res, next) {
  res.send("NOT IMPLEMENTED: POST become-member");
});

router.get("/become-admin", function (req, res, next) {
  res.send("NOT IMPLEMENTED: GET become-admin");
});
router.post("/become-admin", function (req, res, next) {
  res.send("NOT IMPLEMENTED: POST become-admin");
});

router.get("/login", user_controller.login_get);

router.post("/login", user_controller.login_post);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get("/signup", user_controller.signup_get);
router.post("/signup", user_controller.signup_post);

module.exports = router;
