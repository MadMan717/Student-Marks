import { useState } from "react";
import {
  GraduationCap,
  LogOut,
  LayoutDashboard,
  Users,
  TrendingUp,
  Award,
  BookOpen,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

function getTotal(student) {
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

const students = [
  {
    rollNo: "A001",
    name: "Sam Sundar B",
    grade: "10th Grade",
    math: 95,
    science: 92,
    english: 88,
    computer: 96,
    social: 90,
  },
  {
    rollNo: "A002",
    name: "Ravi Kumar",
    grade: "10th Grade",
    math: 85,
    science: 78,
    english: 82,
    computer: 88,
    social: 80,
  },
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const average =
    students.reduce((sum, student) => sum + getPercentage(student), 0) /
    students.length;

  const topPerformers = students.filter(
    (student) => getPercentage(student) >= 90
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-white px-8 py-4 shadow">
        <div className="flex items-center gap-3">
          <GraduationCap size={32} />
          <h1 className="text-2xl font-bold">Student Management System</h1>
        </div>

        <button className="flex items-center gap-2 text-gray-600">
          <LogOut size={20} />
          Logout
        </button>
      </header>

      {/* Navigation */}
      <nav className="flex gap-4 bg-white px-8 py-4">
        <button
          onClick={() => setActivePage("dashboard")}
          className="flex items-center gap-2"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button
          onClick={() => setActivePage("students")}
          className="flex items-center gap-2"
        >
          <Users size={20} />
          Students
        </button>
      </nav>

      {/* Pages */}
      <main className="p-8">
        {activePage === "dashboard" ? (
          <div>
            <h2 className="mb-6 text-3xl font-bold">Dashboard</h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow">
                <Users size={30} />
                <h3 className="mt-3 text-lg font-semibold">
                  Total Students
                </h3>
                <p className="text-3xl font-bold">{students.length}</p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow">
                <TrendingUp size={30} />
                <h3 className="mt-3 text-lg font-semibold">
                  Average Percentage
                </h3>
                <p className="text-3xl font-bold">
                  {average.toFixed(2)}%
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow">
                <Award size={30} />
                <h3 className="mt-3 text-lg font-semibold">
                  Top Performers
                </h3>
                <p className="text-3xl font-bold">
                  {topPerformers.length}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-xl font-bold">
                Student Performance
              </h3>

              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-3">Roll No</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Percentage</th>
                    <th className="p-3">Grade</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => {
                    const percentage = getPercentage(student);

                    return (
                      <tr key={student.rollNo} className="border-b">
                        <td className="p-3">{student.rollNo}</td>
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">{getTotal(student)}</td>
                        <td className="p-3">
                          {percentage.toFixed(2)}%
                        </td>
                        <td className="p-3">
                          {getGrade(percentage)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : activePage === "students" ? (
          <StudentsPage setActivePage={setActivePage} />
        ) : (
          <UpdateMarksPage />
        )}
      </main>
    </div>
  );
}

function StudentsPage({ setActivePage }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Students</h2>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          <Plus size={20} />
          Add New Student
        </button>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Roll No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Total</th>
              <th className="p-3">Percentage</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => {
              const percentage = getPercentage(student);

              return (
                <tr key={student.rollNo} className="border-b">
                  <td className="p-3">{student.rollNo}</td>
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.grade}</td>
                  <td className="p-3">{getTotal(student)}</td>
                  <td className="p-3">
                    {percentage.toFixed(2)}%
                  </td>
                  <td className="p-3">
                    {getGrade(percentage)}
                  </td>

                  <td className="flex gap-4 p-3">
                    
                    <button
                      onClick={() => alert("CLICKED")}
                      className="text-blue-600"
                      title="Update Marks"
                    >
                      <BookOpen size={21} />
                    </button>

                    {/* Edit */}
                    <button className="text-green-600">
                      <Pencil size={21} />
                    </button>

                    {/* Delete */}
                    <button className="text-red-600">
                      <Trash2 size={21} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              Add New Student
            </h2>

            <input
              type="text"
              placeholder="Student Name"
              className="mb-3 w-full rounded border p-2"
            />

            <input
              type="text"
              placeholder="Roll Number"
              className="mb-3 w-full rounded border p-2"
            />

            <input
              type="text"
              placeholder="Grade"
              className="mb-4 w-full rounded border p-2"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded bg-gray-300 px-4 py-2"
              >
                Cancel
              </button>

              <button className="rounded bg-blue-600 px-4 py-2 text-white">
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UpdateMarksPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Update Marks</h1>

      <p className="mt-3 text-gray-600">
        This is the Update Marks page.
      </p>
    </div>
  );
}

export default App;