const mongoose = require("mongoose");
const User = require("./userModel");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  userId: Schema.Types.ObjectId,
  item: String,
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
