const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  membership_status: { type: String, enum: ["associate", "regular"] },
  admin: { type: Boolean },
});

module.exports = mongoose.model("User", userSchema);
