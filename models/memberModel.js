const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let MemberSchema = new Schema({
  userId: Number,
  name: String,
  email: String,
  address: Object,
});

module.exports = mongoose.model("members", MemberSchema);
