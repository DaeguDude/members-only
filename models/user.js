const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  membership_status: { type: String, enum: ["associate", "regular"] },
  admin: { type: Boolean },
});

UserSchema.virtual("isMember").get(function () {
  return this.membership_status === "regular" ? true : false;
});

module.exports = mongoose.model("User", UserSchema);
