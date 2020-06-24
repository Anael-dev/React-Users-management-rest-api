const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let PostSchema = new Schema({
  userId: Number,
  title: String,
  body: String,
});

module.exports = mongoose.model("posts", PostSchema);
