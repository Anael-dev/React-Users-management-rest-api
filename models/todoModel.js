const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let TodoSchema = new Schema({
  userId: Number,
  title: String,
  completed: Boolean,
});

module.exports = mongoose.model("todos", TodoSchema);
