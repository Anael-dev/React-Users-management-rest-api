const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let MemberSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  address: { city: String, street: String, zipcode: String },
});

module.exports = mongoose.model("members", MemberSchema);
