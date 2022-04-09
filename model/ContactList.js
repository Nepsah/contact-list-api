const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  celPhone: {
    type: String,
    required: false,
    max: 11,
    min: 11,
  },
  phone: {
    type: String,
    required: false,
    max: 11,
    min: 10,
  },
});

module.exports = mongoose.model("ContactList", userSchema);
