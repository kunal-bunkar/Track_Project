import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";

const URL = "https://track-project-7heh.onrender.com";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${URL}/user/login`,
        { email, password },
        { withCredentials: true }
      );

      toast.success(data.message || "Logged in successfully.");
      setEmail("");
      setPassword("");
      navigate("/home");
    } catch (error) {
      console.log(error);

      if (error.response) {
        setErrorMessage(error.response.data.message || "Invalid credentials.");
        toast.error(
          error.response.data.message || "Login failed. Please try again."
        );
      } else if (error.request) {
        setErrorMessage("No response from server.");
        toast.error("No response from server.");
      } else {
        setErrorMessage("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-black dark:from-gray-950 dark:via-gray-900 dark:to-black backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-sm font-['Roboto']">
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-gray-100">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
          Login to your Project Tracker dashboard.
        </p>

        {errorMessage && (
          <div className="mb-4 p-2 text-sm bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 rounded">
            {errorMessage}
          </div>
        )}

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-100 dark:bg-white dark:hover:bg-gray-200 transition-colors text-gray-800 py-2 rounded-md text-sm font-semibold shadow-md border border-gray-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
