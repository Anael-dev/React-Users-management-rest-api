const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let MemberSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  address: { city: String, street: String },
  avatar: String,
});

module.exports = mongoose.model("members", MemberSchema);
