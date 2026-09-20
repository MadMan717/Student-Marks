const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  math: {
    type: Number,
    default: 0
  },
  english: {
    type: Number,
    default: 0
  },
  science: {
    type: Number,
    default: 0
  },
  social: {
    type: Number,
    default: 0
  },
  computer: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Student", studentSchema);