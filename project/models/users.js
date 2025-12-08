const mongoose = require("mongoose");

const users = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["user", "moderator", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("users", users);
