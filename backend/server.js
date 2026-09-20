const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
let students = [
  {
    rollNo: "A001",
    name: "Sam Sundar",
    email: "sam@gmail.com",
    grade: "10th Grade",
    math: 95,
    english: 88,
    science: 92,
    social: 90,
    computer: 20
  },
  {
    rollNo: "A002",
    name: "Ravi Kumar",
    email: "ravi@gmail.com",
    grade: "10th Grade",
    math: 85,
    english: 32,
    science: 78,
    social: 80,
    computer: 88
  },
  {
    rollNo: "A003",
    name: "Ram Kumar",
    email: "ram@gmail.com",
    grade: "10th Grade",
    math: 85,
    english: 49,
    science: 10,
    social: 80,
    computer: 88
  }
];
app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/update-students", (req, res)=> {
  const newStudent = req.body;
  students.push(newStudent);
  return res.json(newStudent);
});

app.put("/students/:rollNo", (req, res) => {
  const rollNo = req.params.rollNo;
  const updatedStudent = req.body;
  students = students.map(student =>student.rollNo === rollNo ? updatedStudent : student);
  res.json(updatedStudent);
});

app.put("/edit-student",(req, res) => {
  const updatedStudent= req.body;
  const RollNoStudent=updatedStudent.rollNo;
  console.log(RollNoStudent);
  students = students.map(student => student.rollNo === RollNoStudent ? updatedStudent : student);
  console.log(students);
  res.json(students);
});

app.delete("/delete-student", (req, res) => {
  const rollNo = req.body.rollNo;
  students = students.filter(student =>student.rollNo !== rollNo);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});