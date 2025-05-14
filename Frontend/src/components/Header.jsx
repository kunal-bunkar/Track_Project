import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const URL = "http://localhost:5000";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${URL}/`, { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="w-full flex items-center justify-between px-8 py-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-xl">
      {/* Logo / Branding */}
      <div className="w-1/3 flex items-center">
        <FiCheckCircle className="text-blue-400 text-3xl mr-3" />
        <span className="text-2xl font-bold tracking-wide">TrackIt</span>
      </div>

      {/* Center welcome text */}
      <div className="w-1/3 flex justify-center">
        <span className="text-md md:text-lg italic text-gray-300">
          {user ? `Welcome back, ${user.name}!` : "Loading user..."}
        </span>
      </div>

      {/* Right: Profile + Logout */}
      <div className="w-1/3 flex justify-end items-center space-x-4">
        {user && (
          <>
            <div className="flex flex-col items-end">
              <span className="text-sm md:text-md font-medium">{user.email}</span>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 text-sm rounded-md font-semibold shadow transition duration-200"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
