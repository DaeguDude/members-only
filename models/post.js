const mongoose = require("mongoose");
const { Schema } = mongoose;
const { DateTime } = require("luxon");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  message: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

PostSchema.virtual("timestamp_yyyymmdd").get(function () {
  const yyyymmdd = DateTime.fromJSDate(this.timestamp).toISODate();
  const hhmm = DateTime.fromJSDate(this.timestamp).toLocaleString(
    DateTime.TIME_24_SIMPLE
  );

  return `${yyyymmdd} ${hhmm}`;
});

module.exports = mongoose.model("Post", PostSchema);
