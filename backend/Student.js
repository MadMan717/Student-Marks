const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  rollNo: String,
  name: String,
  email: String,
  grade: String,
  math: Number,
  english: Number,
  science: Number,
  social: Number,
  computer: Number
});
const Student = mongoose.model("Students", studentSchema);
module.exports = Student;