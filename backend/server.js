const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require('cors');
const dns=require("dns");
dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])
require('dotenv').config();
const mongoose=require('mongoose');
const Biodata=require("./biodata.js");
const marks=require("./marks.js");
const Admin=require("./admin.js");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.atlas_URL);
    console.log('MongoDB Atlas connected successfully via Mongoose!');
  } catch (error) {
    console.error(' Database connection failed:', error.message);
    process.exit(1);
  }
};
connectDB();
app.use(express.json());
app.use(cors());

app.post("/login",async(req,res)=>{
  const username=req.body.username;
  const password=req.body.password;
  const admin=await Admin.findOne({username:username});
    if(admin.username===username && admin.password===password){
      const token=jwt.sign(
      { username: username },
      process.env.JWT_SECRET,
      { expiresIn: "1w" }
    );
    res.json({token});
    }else{
      res.json(false);
    }
})
function authenticate(req,res,next){
   const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token" });
  }
  try {
    const user = jwt.verify(token,process.env.JWT_SECRET);
    req.user=user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }

}



app.get("/students", async (req, res) => {
  const students = await Biodata.find();
  const allMarks = await Marksdata.find();

  const result = students.map((student) => {
    const studentMarks = allMarks.find(
      (mark) => mark.rollNo === student.rollNo
    );

    return {
      ...student.toObject(),
      math: studentMarks?.math ?? 0,
      english: studentMarks?.english ?? 0,
      science: studentMarks?.science ?? 0,
      social: studentMarks?.social ?? 0,
      computer: studentMarks?.computer ?? 0
    };
  });

  res.json(result);
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