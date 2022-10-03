var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");

var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var crypto = require("crypto");
const Post = require("../models/post");

/* GET home page. */
router.get("/", function (req, res, next) {
  Post.find({}).exec(function (err, list_posts) {
    if (err) {
      return next(err);
    }

    res.render("index", {
      title: "Express",
      user: req.user,
      posts: list_posts,
    });
  });
});

router.get("/create-post", post_controller.create_post_get);
router.post("/create-post", post_controller.create_post_post);

router.post("/post/:id/delete", post_controller.delete_post_post);

router.get("/become-member", user_controller.become_member_get);
router.post("/become-member", user_controller.become_member_post);

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

router.get("/logout", user_controller.logout_get);

router.get("/signup", user_controller.signup_get);
router.post("/signup", user_controller.signup_post);

module.exports = router;
