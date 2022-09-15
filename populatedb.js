#! /usr/bin/env node

require("dotenv").config();
console.log("This script populates some test users and posts");

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require("async");
const User = require("./models/user");
const Post = require("./models/post");

const mongoose = require("mongoose");
const mongoDB = userArgs[0];

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "members_only",
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const user = new User({
  password: "asdf",
  username: "Daegudude",
  admin: true,
  membershipStatus: "associate",
});

user.save(function (err) {
  if (err) {
    console.log("There was an error saving to the user");
    return;
  }
  console.log("New User: " + user);
  mongoose.connection.close();
});
