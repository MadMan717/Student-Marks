import { GraduationCap, User, Lock } from "lucide-react";
import { useState } from "react";
export default function Login({LoginCheck}) {
const [username,setUserName]=useState("");
const [password,setPassword]=useState("");
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-[550px] p-10">
        <div className="flex justify-center mb-6">
          <div className="w-[110px] h-[110px] bg-black rounded-2xl flex items-center justify-center">
            <GraduationCap size={58} color="white" />
          </div>
        </div>
        <h1 className="text-36px text-center text-black">Admin Portal</h1>
        <p className="text-center text-gray-500 text-20px mt-3">Student Management System</p>
        <div className="mt-11">
          <label className="block text-20px mb-2">Username</label>
          <div className="flex items-center bg-black rounded-xl px-5 h-[60px]">
            <User className="text-gray-400" size={23} />
            <input type="text" className="outline-none text-white text-20px ml-4 w-full" onChange={(e)=>setUserName(e.target.value)}/>
          </div>
        </div>
        <div className="mt-7">
          <label className="block text-20px mb-2">Password</label>
          <div className="flex items-center bg-black rounded-xl px-5 h-[60px]">
            <Lock className="text-gray-400" size={23}/>
            <input type="password" className="outline-none text-white text-20px ml-4 w-full" onChange={(e)=>setPassword(e.target.value)}/>
          </div>
        </div>

        <button onClick={() => LoginCheck(username, password)} className="w-full h-[58px] mt-6 bg-black text-white rounded-xl text-20px hover:bg-[#1d1b31] transition">Sign In </button>
        <div className="mt-7 h-[64px] rounded flex items-center justify-center text-gray-500">Demo credentials:admin/admin</div>
      </div>
    </div>
  );
}