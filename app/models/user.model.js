const mongoose = require("mongoose");

const User = mongoose.model(
  "users",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    active: Boolean,
    firstName: String,
    lastName: String,
  })
);

module.exports = User;
