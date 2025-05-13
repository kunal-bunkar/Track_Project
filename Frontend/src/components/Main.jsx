import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

const URL = "http://localhost:5000";

const Main = () => {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${URL}/`, { withCredentials: true });
        setProjects(response.data.urls);
        setMessage(response?.data?.message || "");
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage(
          error.response?.data?.message ||
            "Something went wrong fetching your projects."
        );
      }
    };

    fetchProjects();
    const intervalId = setInterval(fetchProjects, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleCopyLink = async (shortId) => {
    const link = `${URL}/${shortId}`;
    try {
      await navigator.clipboard.writeText(link);
      alert("✅ Link copied to clipboard!");
    } catch (error) {
      console.error("Error copying link:", error);
      alert("❌ Failed to copy link. Try again.");
    }
  };

  const handleDeleteProject = async (shortId) => {
    console.log("deleted");
    try {
      await axios.delete(`${URL}/delete/${shortId}`, {
        withCredentials: true,
      });
      setProjects((prev) => prev.filter((p) => p.shortId !== shortId));
      alert("✅ Project deleted.");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("❌ Failed to delete project.");
    }
  };

  return (
    <main className="flex-1 px-10 py-8 font-['Roboto'] min-h-[calc(100vh-80px)] bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-2">Your Projects</h2>
        {message && (
          <p className="text-sm text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 p-3 rounded mt-2 max-w-md">
            {message}
          </p>
        )}
      </div>

      <div className="overflow-x-auto shadow rounded-lg bg-white dark:bg-gray-800">
        <table className="min-w-full text-left text-base">
          <thead className="border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-4 px-6">Project Name</th>
              <th className="py-4 px-6">Project Link</th>
              <th className="py-4 px-6">Total Visits</th>
              <th className="py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr
                  key={project.shortId}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group relative"
                >
                  <td className="py-3 px-6 font-medium">
                    {project.project_name}
                  </td>
                  <td className="py-3 px-6">
                    <a
                      href={`${URL}/${project.shortId}`}
                      className="text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Project
                    </a>
                  </td>
                  <td className="py-3 px-6">
                    {project.visitedHistory?.length || 0}
                  </td>
                  <td className="py-3 px-6 relative">
                    <button
                      onClick={() => {
                        setMenuOpenIndex(
                          menuOpenIndex === project.shortId
                            ? null
                            : project.shortId
                        );
                      }}
                      className="text-gray-600 cursor-pointer dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      <HiOutlineDotsVertical size={20} />
                    </button>
                    {menuOpenIndex === project.shortId && (
                      <div className="absolute translate-y-full  bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-20">
                        <button
                          onClick={() => {
                            handleCopyLink(project.shortId);
                            setMenuOpenIndex(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Copy Share Link
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteProject(project.shortId);
                            setMenuOpenIndex(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-600 dark:text-red-400"
                        >
                          Delete Project
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-6 px-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Main;
