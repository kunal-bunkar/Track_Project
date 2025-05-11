import { useState } from "react";
import axios from "axios";

const URL = "http://localhost:5000";
const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await axios.post(`${URL}/user/login`, {
        email,
        password,
      });
  
      console.log(data.message); // Assuming your backend sends { message: 'User created' }
  
      
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm font-['Roboto']">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800 text-center">Project Tracker</h2>

        <form className="flex flex-col space-y-4">
          <div>
            <label htmlFor="email" className="block  text-gray-700 text-sm mb-1">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className=" px-4 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-900 transition"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
