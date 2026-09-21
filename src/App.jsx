import { useState,useEffect} from "react";

import {
  GraduationCap,
  LogOut,
  LayoutDashboard,
  Users,
  TrendingUp,
  Award,
  Pencil,
  Trash2,
  Plus,
  BookOpen
} from "lucide-react";

function getTotal(student){
  return (
    student.math +
    student.english +
    student.science +
    student.social +
    student.computer
  );
}

function getPercentage(student) {
  return (getTotal(student) / 500) * 100;
}

function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  return "C";
}

function getPassPercent(students){
  let noOfPassmarks=0;
  let totalSubjects=5*students.length;
  for(let i=0;i<students.length;i++){
    let student=students[i];
    if(student.math>50){
      noOfPassmarks++;
    }
    if(student.science>50){
      noOfPassmarks++;
    }
    if(student.english>50){
      noOfPassmarks++;
    }
    if(student.computer>50){
      noOfPassmarks++;
    }
    if(student.social>50){
      noOfPassmarks++;
    }
  }

  let passPercent=(noOfPassmarks/totalSubjects)*100;
  return passPercent.toFixed(2);
  
}



function getAverage(students){
  let i=0
  let totalaverage=0;
  let studentlength=students.length;
  let totalpercent=0;
  while(i<studentlength){
    let student=students[i];
    let percent=getPercentage(student);
    totalpercent=totalpercent+percent;
    i++
  }
  totalaverage=totalpercent/studentlength;
  return totalaverage.toFixed(2);
}

function getPerformer(students){
  let i=0;
  let Perfomers=0;
  for(i=0;i<students.length;i++){
    let student=students[i];
    if(student.math>50){
      Perfomers++;
    }
    if(student.science>50){
      Perfomers++;
    }
    if(student.english>50){
      Perfomers++;
    }
    if(student.computer>50){
      Perfomers++;
    }
    if(student.social>50){
      Perfomers++;
    }
  }
  return Perfomers;
}





function App() {
const[students, setStudents] = useState([]);
const[studentAdded,setStudentAdded]=useState(false);
useEffect(() => {
  console.log(fetch("http://localhost:5000/students"));
  fetch("http://localhost:5000/students")
    .then(res=>(res.json()))
    .then(data=>setStudents(data));
},[]);



  const [activePage, setActivePage] = useState("dashboard");
  const [currentStudent,setCurrentStudent]=useState();
   let pageContent;

   if (activePage === "dashboard") {
    pageContent = <DashBoardPage students={students} />;
  } else if (activePage === "students") {
    pageContent = <StudentsPage students={students} setStudents={setStudents} setActivePage={setActivePage} setCurrentStudent={setCurrentStudent} />;   
  } else if (activePage === "updatemarks") {
    pageContent = <UpdateMarksPage currentStudent={currentStudent} setCurrentStudent={setCurrentStudent} setStudents={setStudents} setActivePage={setActivePage}/>;   
  }
  else if(activePage==="editprofile"){
    pageContent=<EditProfile  currentStudent={currentStudent} setCurrentStudent={setCurrentStudent} setStudents={setStudents} setActivePage={setActivePage}/>;
  }
  else if(activePage=="deletestudents" ){
    pageContent=<DeleteStudent currentStudent={currentStudent} setStudents={setStudents} setActivePage={setActivePage}/>
  }
   else {
    pageContent = <div>Page Not Found</div>;
  }
  

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-[86px] max-w-[2000px] items-center justify-between px-5">

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#11101f] text-white shadow-md">
              <GraduationCap size={25} />
            </div>

            <div>
              <h1 className="text-[21px] font-medium">
                Student Management System
              </h1>

              <p className="text-[14px] text-gray-500">
                Admin Portal
              </p>
            </div>
          </div>

          <button className="flex gap-2 rounded-xl bg-red-600 px-6 py-2.5 text-[15px] font-medium text-white hover:bg-red-700">
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </header>

      <nav>
        <div className="mx-auto flex max-w-[2000px] gap-3 px-5 py-2">
          <button
            onClick={() => setActivePage("dashboard")}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 text-[16px] transition ${
              activePage === "dashboard"
                ? "bg-[#11101f] text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            onClick={() => setActivePage("students")}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 text-[16px] transition ${
              activePage === "students"
                ? "bg-[#11101f] text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <Users size={18} />
            Students
          </button>

        </div>
      </nav>


      <main className="mx-auto max-w-[2000px] px-5 py-10">
        {pageContent}
        
      </main>

    </div>
  );
}

function DashBoardPage({students}){
  return(
    <>
            <div>
              <h1 className="text-[35px]">Dashboard Overview</h1>
              <p className="text-gray-500 text-[20px]">Monitor student performance and academic metrics</p>
            </div>

            <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Students"
                value={students.length}
                icon={<Users size={25} />}
                iconClass="bg-blue-500"
              />

              <StatCard
                title="Average Score"
                value={getAverage(students)}
                icon={<TrendingUp size={25} />}
                iconClass="bg-green-500"
              />

           
              <StatCard
                title="Pass Rate"
                value={getPassPercent(students)+"%"}
                icon={<GraduationCap size={25} />}
                iconClass="bg-purple-500"
              />

              <StatCard title="Top Performer" value={getPerformer(students)} icon={<Award size={25}/>} iconClass="bg-orange-500"
              />

              
            </section>
            <section>

              <div className="border-b border-gray-400 py-5">
                <h1 className="text-[22px] font-medium ">
                  Student Performance
                </h1>

                <p className="mt-2 text-[15px] text-gray-500">
                  Comprehensive marks overview across all subjects
                </p>
              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1000px] border-collapse">
                  <thead>
                    <tr>

                      <TableHeader>Roll No.</TableHeader>
                      <TableHeader>Student Name</TableHeader>
                      <TableHeader>Math</TableHeader>
                      <TableHeader>English</TableHeader>
                      <TableHeader>Science</TableHeader>
                      <TableHeader>Social</TableHeader>
                      <TableHeader>Computer</TableHeader>
                      <TableHeader>Total</TableHeader>
                      <TableHeader>%</TableHeader>
                      <TableHeader>Grade</TableHeader>

                    </tr>
                  </thead>


                  <tbody>
                    {students.map((student) => {
                      const total = getTotal(student);
                      const percentage = getPercentage(student);
                      const grade = getGrade(percentage);

                      return (
                        <tr
                          key={student.rollNo}
                        >

                          <td className="px-7 py-5">
                            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm">
                              {student.rollNo}
                            </span>
                          </td>


                          <td className="px-5 py-5">
                            <div>

                              <p className="font-medium">
                                {student.name}
                              </p>

                              <p className="mt-1 text-sm text-slate-500">
                                {student.grade}
                              </p>

                            </div>
                          </td>


                          <TableCell>{student.math}</TableCell>
                          <TableCell>{student.english}</TableCell>
                          <TableCell>{student.science}</TableCell>
                          <TableCell>{student.social}</TableCell>
                          <TableCell>{student.computer}</TableCell>


                          <td className="px-5 py-5 text-center">
                            <span className="rounded-lg bg-slate-200 px-3 py-2 text-sm">
                              {total}/500
                            </span>
                          </td>


                          <TableCell>
                            {percentage.toFixed(0)}%
                          </TableCell>


                          <td className="px-5 py-5 text-center">

                            <span
                              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                                grade === "A+"
                                  ? "bg-green-50 text-green-600"
                                  : grade === "A"
                                  ? "bg-green-50 text-green-500"
                                  : "bg-yellow-50 text-yellow-600"
                              }`}
                            >
                              {grade}
                            </span>

                          </td>

                        </tr>
                      );
                    })}

                  </tbody>

                </table>

              </div>

            </section>
          </>
  );
}


function TitleSection({ title, description }) {

  return (
    <section className="mb-9">

      <h2 className="text-[25px] font-medium tracking-tight">
        {title}
      </h2>

      <p className="mt-1 text-[15px] text-gray-500">
        {description}
      </p>

    </section>
  );
}


function StatCard({title,value,icon,iconClass}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-7 py-7 shadow-sm">
      <div>
        <p className="text-[15px] text-slate-500">
          {title}
        </p>
        <p className="mt-2 text-[32px] font-medium tracking-tight">
          {value}
        </p>
      </div>


      <div
        className={`flex h-14 w-14 items-center justify-center rounded-xl text-white ${iconClass}`}
      >
        {icon}
      </div>

    </div>
  );
}



function TableHeader({ children }) {

  return (
    <th className="px-5 py-5 text-center text-[15px] font-semibold">
      {children}
    </th>
  );
}


function TableCell({ children }) {
  return (
    <td className="px-5 py-5 text-center text-[15px]">
      {children}
    </td>
  );
}

function StudentsPage({students,setStudents,setActivePage,setCurrentStudent}) {
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [rollNo, setRollNo]=useState("");
    const [grade, setGrade]=useState("");
    const [showAddStudent, setShowAddStudent]=useState(false);





function AddStudent() {
  const newStudent = {
    name: name,
    email: email,
    rollNo: rollNo,
    grade: grade
  };

  fetch("http://localhost:5000/update-students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newStudent)
  })
    .then(res => res.json())
    .then(data => {setStudents(prevStudents => [...prevStudents, data]);
      setShowAddStudent(false);
    });
}

    return (
      <section>
        <div className="mb-9 flex items-start justify-between">
          <TitleSection
            title="Student Management"
            description="Add, edit, and manage student information"
          />
          <button
            onClick={() => setShowAddStudent(true)}
            className="flex items-center gap-3 rounded-xl bg-[#11101f] px-6 py-4 text-[16px] font-medium text-white shadow-sm transition hover:bg-[#1c1b2e]"
          >
            <Plus size={22} />
            Add Student
          </button>

        </div>


        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-9 py-7">
            <h3 className="text-[22px] font-medium">
              All Students
            </h3>
          </div>


          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="border-b border-slate-200 bg-slate-50">

                  <th className="px-9 py-6 text-left text-[15px] font-semibold">
                    Roll Number
                  </th>

                  <th className="px-5 py-6 text-left text-[15px] font-semibold">
                    Name
                  </th>

                  <th className="px-5 py-6 text-left text-[15px] font-semibold">
                    Email
                  </th>

                  <th className="px-5 py-6 text-left text-[15px] font-semibold">
                    Class
                  </th>

                  <th className="px-9 py-6 text-right text-[15px] font-semibold">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                  {students.map((student) => (

                  <tr
                    key={student.rollNo}
                    className="border-b border-slate-200 last:border-0 hover:bg-slate-50"
                  >

                    <td className="px-9 py-7">
                      <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm">
                        {student.rollNo}
                      </span>
                    </td>


                    <td className="px-5 py-7 text-[16px]">
                      {student.name}
                    </td>


                    <td className="px-5 py-7 text-[16px] text-slate-500">

                      {student.email ||
                        `${student.name
                          .toLowerCase()
                          .replace(" ", ".")}@school.com`}
                    </td>
                    <td className="px-5 py-7 text-[16px]">
                      {student.grade}
                    </td>


                    <td className="px-9 py-7">

                      <div className="flex justify-end gap-6">
                        <button onClick={() => {setCurrentStudent(student); setActivePage("updatemarks")}} className="text-blue-600 transition hover:text-blue-800" title="Update Marks">
                          <BookOpen size={21}></BookOpen>
                        </button>
                        

                        <button onClick={()=> {setCurrentStudent(student); setActivePage("editprofile")}} className="text-green-600 transition hover:text-green-800" title="Edit" >
                          <Pencil size={21} />
                        </button>

                        <button onClick={() => {setCurrentStudent(student);setActivePage("deletestudents"); }}className="text-red-600 transition hover:text-red-800" title="Delete">
                          <Trash2 size={21} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>


          {showAddStudent && (
            <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[100px]">

              <div className="w-[650px] rounded-2xl bg-white p-9 shadow-2xl">

                <h2 className="mb-8 text-[30px] font-normal">
                  Add New Student
                </h2>


                <div className="space-y-6">

                  <div>

                    <label className="mb-3 block text-[18px]">
                      Name
                    </label>

                  <input
                    type="text"
                    placeholder="Enter student name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-6 py-5 text-[18px] outline-none focus:border-slate-400"
                    />

                  </div>


                  <div>

                    <label className="mb-3 block text-[18px]">
                      Email
                    </label>

                    <input
                      type="email"
                      placeholder="student@school.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-6 py-5 text-[18px] outline-none focus:border-gray-400"
                    />

                  </div>


                  <div>

                    <label className="mb-3 block text-[18px]">
                      Roll Number
                    </label>

                    <input
                      type="text"
                      placeholder="A001"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-6 py-5 text-[18px] outline-none focus:border-slate-400"
                    />

                  </div>


                  <div>

                    <label className="mb-3 block text-[18px]">
                      Class
                    </label>

                    <input
                      type="text"
                      placeholder="10th Grade"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-6 py-5 text-[18px] outline-none focus:border-slate-400"
                    />
                  </div>

                </div>


                <div className="mt-8 flex gap-5">

                  <button
                    onClick={() => setShowAddStudent(false)}
                    className="flex-1 rounded-xl bg-slate-100 px-6 py-4 text-[18px] transition hover:bg-gray-200"
                  >
                    Cancel
                  </button>


                  <button
                    onClick={AddStudent}
                    className="flex-1 rounded-xl bg-[#11101f] px-6 py-4 text-[18px] text-white shadow-sm transition hover:bg-[#1c1b2e]"
                  >
                    Add Student
                  </button>

                </div>

              </div>

            </div>

          )}

        </section>
      );


  }
function UpdateMarksPage({currentStudent,setCurrentStudent,setStudents,setActivePage}) {
 function UpdateMarks() {
  fetch("http://localhost:5000/update-marks", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(currentStudent)
  })
    .then(res => res.json())
    .then(data => {
      setStudents(data);
      setActivePage("students");
    });
}

  return (
    <div>
      <button onClick={() => setActivePage("students")} >Back to Student</button>
      <h1 className="text-[30px]">Update Student Marks</h1>
      <p className="text-gray-500 text-[20px]"> Student: {currentStudent.name}</p>

      <div className="border border-white hover:border-gray-400 rounded-xl p-4 mt-6 flex items-center w-300">
           <h2 className=" font-bold text-[20px] w-1/2">Mathematics</h2>
        <div className="w-1/3">
          <label className="text-gray-500">Marks Obtained</label>
          <input type="number" value={currentStudent.math} className="border border-transparent focus:border-black rounded-xl w-full p-4 mt-2 outline-none"
          onChange={(e)=>setCurrentStudent(prev=>({...prev, math:Number(e.target.value)
          }))}
          />
        </div>
        <div className="w-1/3 ml-5">
          <label className="text-gray-500">  Maximum Marks</label>
          <input type="number" value="100" className="border border-transparent focus:border-black rounded-xl w-full p-4 mt-2 outline-none"/>
        </div>
      </div>

        <div className="border border-white hover:border-gray-400 rounded-xl p-4 mt-6 flex items-center w-300">
           <h2 className=" font-bold text-[20px] w-1/2">English</h2>
        <div className="w-1/3">
          <label className="text-gray-500">Marks Obtained</label>
          <input type="number" value={currentStudent.english} className="border border-transparent focus:border-black rounded-xl w-full p-4 mt-2 outline-none"
          onChange={(e)=>setCurrentStudent(prev=>({...prev, english:Number(e.target.value)
          }))}
          />
        </div>
        <div className="w-1/3 ml-5">
          <label className="text-gray-500">  Maximum Marks</label>
          <input type="number" value="100" className="border border-transparent focus:border-black rounded-xl w-full p-4 mt-2 outline-none"/>
        </div>
        </div>

          <div className="border border-white hover:border-gray-400 rounded-xl p-4 mt-6 flex items-center w-300">
           <h2 className=" font-bold text-[20px] w-1/2">Science</h2>
        <div className="w-1/3">
          <label className="text-gray-500">Marks Obtained</label>
          <input type="number" value={currentStudent.science} className="border border-transparent focus:border-black rounded-xl w-full p-4 mt-2 outline-none"
          onChange={(e)=>setCurrentStudent(prev=>({...prev, science:Number(e.target.value)
          }))}
          />
        </div>
        <div className="w-1/3 ml-5">
          <label className="text-gray-500">  Maximum Marks</label>
          <input type="number" value="100" className="border border-transparent focus:border-black rounded-xl w-full p-4 mt-2 outline-none"/>
        </div>
        </div>

          <div className="border border-white hover:border-gray-400 rounded-xl p-4 mt-6 flex items-center w-300">
           <h2 className="font-bold text-[20px] w-1/2">Scocial Science</h2>
        <div className="w-1/3">
          <label className="text-gray-500">Marks Obtained</label>
          <input type="number" value={currentStudent.social} className="border border-transparent focus:border-black rounded-xl w-full p-4 mt-2 outline-none"
          onChange={(e)=>setCurrentStudent(prev=>({...prev, social:Number(e.target.value)
          }))}
          />
        </div>
        <div className="w-1/3 ml-5">
          <label className="text-gray-500">  Maximum Marks</label>
          <input type="number" value="100" className="border border-transparent focus:border-black rounded-xl w-full p-4 mt-2 outline-none"/>
        </div>
        </div>

        <div className="border border-white hover:border-gray-400 rounded-xl p-4 mt-6 flex items-center w-300">
           <h2 className=" font-bold text-[20px] w-1/2">Computer Science</h2>
        <div className="w-1/3">
          <label className="text-gray-500">Marks Obtained</label>
          <input type="number" value={currentStudent.computer} className="border border-transparent focus:border-black rounded-xl w-full p-4 mt-2 outline-none"
          onChange={(e)=>setCurrentStudent(prev=>({...prev, computer:Number(e.target.value)
          }))}
          />
        </div>
        <div className="w-1/3 ml-5">
          <label className="text-gray-500">  Maximum Marks</label>
          <input type="number" value="100" className="border border-transparent focus:border-black rounded-xl w-full p-4 mt-2 outline-none"/>
        </div>
      </div>

      <div>
          <button onClick={UpdateMarks}
                    className="flex-1 rounded-xl bg-[#11101f] px-6 py-4 text-[18px] text-white shadow-sm transition hover:bg-[#1c1b2e]">
                    Update Marks
                  </button>
      </div>


        <div className="border border-gray-300 rounded-2xl p-8 mt-8">
          <h2 className="text-[30px] font-normal mb-8">
            Performance Summary
          </h2>

  <div className="grid grid-cols-3 gap-6">
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <p className="text-gray-500 text-[20px]">
        Total Marks
      </p>

      <div className="mt-4">
        <span className="text-[44px]">{getTotal(currentStudent)}</span>
        <span className="text-gray-500 text-[28px] ml-2">
          / 500
        </span>
      </div>
    </div>

    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <p className="text-gray-500 text-[20px]">
        Percentage
      </p>

      <div className="mt-4">
        <span className="text-blue-600 text-[44px]">
          {getPercentage(currentStudent)}%
        </span>
      </div>
    </div>

    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      <p className="text-gray-500 text-[20px]">
        Grade
      </p>

      <div className="mt-4">
        <span className="text-green-600 text-[44px]">
          {getGrade(currentStudent)}
        </span>
      </div>
    </div>

  </div>

</div>

    </div>
  );


}

function EditProfile({currentStudent,setCurrentStudent,setStudents,setActivePage}){
  function UpdateStudent() {
  fetch("http://localhost:5000/edit-student", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(currentStudent)
  })
  .then(res => res.json())
  .then(data => {
    setStudents(data);
    setActivePage("students");
  });
  }
  return(
    <>
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[100px]">

              <div className="w-[650px] rounded-2xl bg-white p-9 shadow-2xl">
                <h2 className="mb-8 text-[30px] font-normal">
                  Add New Student
                </h2>

                <div className="space-y-6">

                  <div>

                    <label className="mb-3 block text-[18px]">
                      Name
                    </label>

                  <input
                    type="text"
                    placeholder="Enter student name"
                    value={currentStudent.name}
                    onChange={(e)=>setCurrentStudent(prev=>({...prev, name:e.target.value}))}
                    className="w-full rounded-xl border border-slate-200 px-6 py-5 text-[18px] outline-none focus:border-slate-400"
                    />

                  </div>


                  <div>

                    <label className="mb-3 block text-[18px]">
                      Email
                    </label>

                    <input
                      type="email"
                      placeholder="student@school.com"
                      value={currentStudent.email}
                      onChange={(e)=>setCurrentStudent(prev=>({...prev, email:e.target.value}))}
                      className="w-full rounded-xl border border-slate-200 px-6 py-5 text-[18px] outline-none focus:border-gray-400"
                    />

                  </div>


                  <div>

                    <label className="mb-3 block text-[18px]">
                      Roll Number
                    </label>

                    <input
                      type="text"
                      placeholder="A001"
                      value={currentStudent.rollNo}
                      onChange={(e)=>setCurrentStudent(prev=>({...prev, rollNo:e.target.value}))}
                      className="w-full rounded-xl border border-slate-200 px-6 py-5 text-[18px] outline-none focus:border-slate-400"
                    />

                  </div>


                  <div>

                    <label className="mb-3 block text-[18px]">
                      Class
                    </label>

                    <input
                      type="text"
                      placeholder="10th Grade"
                      value={currentStudent.grade}
                      onChange={(e)=>setCurrentStudent(prev=>({...prev,grade:e.target.value}))}
                      className="w-full rounded-xl border border-slate-200 px-6 py-5 text-[18px] outline-none focus:border-slate-400"
                    />
                  </div>

                </div>


                <div className="mt-8 flex gap-5">

                  <button
                    onClick={() => setActivePage("students")}
                    className="flex-1 rounded-xl bg-slate-100 px-6 py-4 text-[18px] transition hover:bg-gray-200"
                  >
                    Cancel
                  </button>


                  <button onClick={UpdateStudent}
                    className="flex-1 rounded-xl bg-[#11101f] px-6 py-4 text-[18px] text-white shadow-sm transition hover:bg-[#1c1b2e]"
                  >
                    Update
                  </button>

                </div>

              </div>

            </div>

    </>
  )

}

function DeleteStudent({currentStudent,setStudents,setActivePage }) {

function Delete(){
     fetch("http://localhost:5000/delete-student", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(currentStudent)
  })
  .then(res => res.json())
  .then(data =>{
    setStudents(data);
    setActivePage("students")});
}
return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[650px] rounded-2xl bg-white p-9 shadow-2xl">
        <h2 className="mb-5 text-[30px] font-normal">
          Delete Student
        </h2>
        <p className="text-[20px] leading-9 text-gray-500">
          Are you sure you want to delete this student? This
          action cannot be undone and all associated data will be
          permanently removed.
        </p>
        <div className="mt-8 flex gap-5">

          <button
            onClick={() => setActivePage("students")}
            className="flex-1 rounded-xl bg-white-100 px-6 py-4 text-[18px] transition hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={() => Delete()}
            className="flex-1 rounded-xl bg-red-600 px-6 py-4 text-[18px] text-white shadow-sm transition hover:bg-red-700">
            Delete Student
          </button>

        </div>

      </div>

    </div>
  );
}



  export default App;
