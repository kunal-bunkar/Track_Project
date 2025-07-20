import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const URL = "https://track-project-7heh.onrender.com";
const URLs = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${URL}/url`,
        { name, url },
        { withCredentials: true }
      );

      setName("");
      setUrl("");

      toast.success(data.message || "URL created successfully");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Failed to create URL.");
      } else if (error.request) {
        toast.error("No response from server.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  return (
    <div className="flex flex-col gap-6 p-8  shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300">
      {/* Heading */}
      <div className="text-left">
        <h4 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Create a New Project URL
        </h4>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
          Easily generate a short, trackable link for your project.
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch w-full">
        {/* Project Name Input */}
        <input
          type="text"
          placeholder="e.g. Portfolio Website"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full md:w-1/4 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400 transition-colors"
        />

        {/* Project URL Input */}
        <input
          type="text"
          placeholder="https://your-project-link.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400 transition-colors"
        />

        {/* Create Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full md:w-1/4 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-800 text-white font-semibold rounded-lg shadow-md hover:from-black hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200"
        >
          Create URL
        </button>
      </div>
    </div>
  );
};

export default URLs;
