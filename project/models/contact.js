const mongoose = require("mongoose");

const contact = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["seo", "websites", "ecommerce", "branding"],
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "active",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contact", contact);
