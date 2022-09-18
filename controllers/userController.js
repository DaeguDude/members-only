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
exports.signup_post = (req, res, next) => {
  res.send("signup_post");
};
