const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  name: String,
  title: String,
  about: String,
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("About", AboutSchema);
