import { GraduationCap, User, Lock } from "lucide-react";
import { useState } from "react";
export default function Login({LoginCheck}) {
const [username,setUserName]=useState("");
const [password,setPassword]=useState("");
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-5">
      <div className="w-full max-w-[550px] p-10 bg-white rounded-2xl border border-gray-200 shadow-[0_15px_50px_rgba(0,0,0,0.2)]">
        <div className="flex justify-center mb-6">
          <div className="w-[110px] h-[110px] bg-black rounded-2xl flex items-center justify-center">
            <GraduationCap size={58} color="white" />
          </div>
        </div>
        <h1 className="text-[30px] text-center text-black">Admin Portal</h1>
        <p className="text-center text-gray-500 text-20px mt-3">Student Management System</p>
        <div className="mt-11">
          <label className="block text-20px mb-2">Username</label>
          <div className="flex items-center bg-white rounded-xl px-5 h-[60px] border border-transparent focus-within:border-black">
            <User className="text-gray-400" size={23} />
            <input type="text" placeholder="Enter username" className="outline-none text-black text-20px ml-4 " onChange={(e)=>setUserName(e.target.value)}/>
          </div>
        </div>
        <div className="mt-7">
          <label className="block text-20px mb-2">Password</label>
          <div className="flex items-center bg-white rounded-xl px-5 h-[60px] border-2 border border-transparent focus-within:border-black">
            <Lock className="text-gray-400" size={23}/>
            <input type="password" placeholder="Enter password" className="outline-none text-black text-20px ml-4" onChange={(e)=>setPassword(e.target.value)}/>
          </div>
        </div>

        <button onClick={() => LoginCheck(username, password)} className="w-full h-[58px] mt-6 bg-black text-white rounded-xl text-20px hover:bg-[#1c1c1c]">Sign In </button>
        <div className="ml-30 mt-7 h-[64px] items-center justify-center text-gray-500 rounded-2xl border border-gray-200 shadow-[0_15px_50px_rgba(0,0,0,0.2)]">Demo credentials:<span className="text-black">admin/admin</span></div>
      </div>
    </div>
  );
}