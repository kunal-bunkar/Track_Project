const URLs = () => {
  return (
    <div className="flex flex-col gap-6 p-8 rounded-xl shadow-xl bg-white ">
  {/* Heading */}
  <div className="text-left">
    <h4 className="text-3xl font-bold text-gray-800">Create New URL</h4>
  </div>

  {/* Form */}
  <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full">
    <input
      type="text"
      placeholder="Project name"
      className="w-full md:w-1/4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-800"
    />
    <input
      type="text"
      placeholder="Project URL"
      className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-800"
    />

    {/* Premium Button */}
    <button
  type="submit"
  className="w-full md:w-1/4 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-lg shadow-md hover:from-black hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
>
  Create URL
</button>

  </div>
</div>

  );
};

export default URLs;
