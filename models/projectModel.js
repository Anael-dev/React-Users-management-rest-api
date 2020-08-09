const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ProjectSchema = new Schema({
  title: String,
  dueDate: Date,
  users: [{ id: Number }],
});

module.exports = mongoose.model("projects", ProjectSchema);
