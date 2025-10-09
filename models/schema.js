let mongoose = require("mongoose");



let todoSchema = new mongoose.Schema({
  task: String,
  des: String,
  comp: Boolean,
});

let UserTask = mongoose.model("UserTask", todoSchema);
module.exports = UserTask;
