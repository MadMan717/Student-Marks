const express = require("express");
const app = express();
const cors = require('cors');
const dns=require("dns");
dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])
require('dotenv').config();
const mongoose = require('mongoose');
const Student = require("./Student.js");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.atlas_URL);
    console.log('✅ MongoDB Atlas connected successfully via Mongoose!');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};
connectDB();
app.use(express.json());
app.use(cors());

app.get("/students", async (req, res) => {
  const students=await Student.find();
  console.log(students);
  res.json(students);
});

app.post("/add-students", async (req, res)=> {
  const newStudent = req.body;
  const student = new Student(newStudent);
  await student.save();
  return res.json(student);
});

app.put("/update-marks", async (req, res) => {
  const updatedmarks=req.body;
  const studentRollNo=updatedmarks.rollNo;
  const student=await Student.findOne({rollNo:studentRollNo});
  student.math=updatedmarks.math;
  student.english=updatedmarks.english;
  student.science=updatedmarks.science;
  student.social=updatedmarks.social;
  student.computer=updatedmarks.computer;
  await student.save();
  const students = await Student.find();
  res.json(students);
});

app.put("/edit-student",async (req, res) => {
  const updatedStudent= req.body;
  const RollNoStudent=updatedStudent.rollNo;
  const student=await Student.findOne({rollNo:RollNoStudent});
  student.name=updatedStudent.name;
  student.email=updatedStudent.email;
  student.social=updatedStudent.social;
  student.grade =updatedStudent.grade;
  await student.save();
  const students=await Student.find();
  res.json(students);
});

app.delete("/delete-student", async (req, res) => {
  const updatedstudents = req.body;
  const studentRollNo=updatedstudents.rollNo;
  await Student.findOneAndDelete({rollNo:studentRollNo});
  const students = await Student.find();
  res.json(students);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});