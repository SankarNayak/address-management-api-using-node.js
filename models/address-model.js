const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  vill: String,
  post: String,
  state: String,
  pincode: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
