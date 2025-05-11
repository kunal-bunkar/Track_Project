import { HiOutlineDotsVertical } from "react-icons/hi"; // Import three-dot icon

const Main = () => {
  return (
    <main className="flex-1 px-10 py-8 font-['Roboto'] min-h-[calc(100vh-80px)] text-gray-900">
      <h2 className="text-3xl font-semibold mb-8">Your Projects</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-lg">
          <thead className="border-b border-gray-400 text-gray-700">
            <tr>
              <th className="py-4 px-6">Project</th>
              <th className="py-4 px-6">Project URL</th>
              <th className="py-4 px-6">Users</th>
              <th className="py-4 px-6"></th> {/* Empty header for icon */}
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "ChatBot",
                url: "https://localhost/ioPcsdhj",
                user: 56,
              },
              {
                name: "Task Manager",
                url: "https://localhost/task",
                user: 32,
              },
              {
                name: "Portfolio",
                url: "https://localhost/portfolio",
                user: 19,
              },
            ].map((project, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 hover:bg-gray-100 transition group"
              >
                <td className="py-3 px-6">{project.name}</td>
                <td className="py-3 px-6">
                  <a
                    href={project.url}
                    className="text-blue-600 hover:text-blue-500 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.url}
                  </a>
                </td>
                <td className="py-3 px-6">{project.user}</td>
                <td className=" ">
                  <HiOutlineDotsVertical
                    className="text-gray-600 hover:text-gray-800 cursor-pointer text-xl"
                    title="Options"
                    onClick={() => console.log("Options for:", project.name)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Main;
