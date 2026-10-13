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
const Marksdata=require("./marks.js");
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
      math: studentMarks?.math,
      english: studentMarks?.english,
      science: studentMarks?.science,
      social: studentMarks?.social,
      computer: studentMarks?.computer 
    };
  });

  res.json(result);
});

app.post("/add-students", async (req, res) => {
    const newStudent = req.body;
    const student = await Biodata.create({
      rollNo: newStudent.rollNo,
      name: newStudent.name,
      email: newStudent.email,
      grade: newStudent.grade
    });
    await Marksdata.create({
      rollNo: newStudent.rollNo,
      math: newStudent.math ?? 0,
      english: newStudent.english ?? 0,
      science: newStudent.science ?? 0,
      social: newStudent.social ?? 0,
      computer: newStudent.computer ?? 0
    });

    res.json(student);
});


app.put("/update-marks", async (req, res) => {
    const updatedmarks = req.body;
    const rollNo = updatedmarks.rollNo;
    await Marksdata.findOneAndUpdate(
      { rollNo: rollNo },
      {
        $set: {
          math: updatedmarks.math,
          english: updatedmarks.english,
          science: updatedmarks.science,
          social: updatedmarks.social,
          computer: updatedmarks.computer
        }
      },
      { new: true, upsert: true }
    );
    const students = await Biodata.find();
    const allMarks = await Marksdata.find();
    const result = students.map((student) => {
      const studentMarks = allMarks.find(
        (mark) => mark.rollNo === student.rollNo
      );

      return {
        ...student.toObject(),
        math: studentMarks?.math,
        english: studentMarks?.english,
        science: studentMarks?.science ,
        social: studentMarks?.social ,
        computer: studentMarks?.computer
      };
    });
    res.json(result);
});



app.put("/edit-student", async (req, res) => {
  try {
    const updatedStudent = req.body;
    const rollNo = updatedStudent.rollNo;

    await Biodata.findOneAndUpdate(
      { rollNo: rollNo },
      {
        name: updatedStudent.name,
        email: updatedStudent.email,
        grade: updatedStudent.grade
      }
    );

    await Marksdata.findOneAndUpdate(
      { rollNo: rollNo },
      {
        social: updatedStudent.social
      }
    );

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to edit student" });
  }
});



app.delete("/delete-student", async (req, res) => {
  try {
    const studentRollNo = req.body.rollNo;

    await Biodata.findOneAndDelete({ rollNo: studentRollNo });
    await Marksdata.findOneAndDelete({ rollNo: studentRollNo });

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete student" });
  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});