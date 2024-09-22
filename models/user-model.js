const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  addresses: [
    {
      vill: String,
      post: String,
      state: String,
      pincode: Number,
    },
  ],
});

const User = new mongoose.model("user", userSchema);
module.exports = User;
