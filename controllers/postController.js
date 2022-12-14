const { body, validationResult } = require("express-validator");
const Post = require("../models/post");

// GET request for posts
exports.post_list = (req, res, next) => {};

// GET request for create-post
exports.create_post_get = (req, res, next) => {
  res.render("post_form");
};

// POST request for create-post
exports.create_post_post = [
  body("title").not().isEmpty().withMessage("Title can't be empty!"),
  body("message").not().isEmpty().withMessage("Message can't be empty!"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send("error");
    }

    if (!req.user) {
      return res.send("user is required");
    }

    const post = new Post({
      title: req.body.title,
      message: req.body.message,
      user: req.user,
    });

    post.save(function (err) {
      if (err) {
        return next(err);
      }

      res.redirect("/");
    });
  },
];

// DELETE request for post
exports.delete_post_post = (req, res, next) => {
  Post.findByIdAndRemove(
    req.params.id,
    {},
    function deletePost(err, document, response) {
      if (err) {
        return next(err);
      }

      return res.redirect("/");
    }
  );
};
