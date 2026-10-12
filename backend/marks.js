const mongoose = require("mongoose");
const marksSchmema = new mongoose.Schema({
  rollNo: String,
  math: Number,
  english: Number,
  science: Number,
  social: Number,
  computer: Number
});
const Marksdata = mongoose.model("marks", marksSchmema);
module.exports = Marksdata;