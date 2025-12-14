const mongoose = require("mongoose");
const { create } = require("./users");

const information = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Birthday: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  experiences: {
    type: Number,
    required: true,
  },
  customers: {
    type: Number,
    required: true,
  },
  projects: {
    type: Number,
    required: true,
  },
  awards: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("information", information);
