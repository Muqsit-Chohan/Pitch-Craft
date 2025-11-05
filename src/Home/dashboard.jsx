import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../Home/home.css";
import { FaUserCircle } from "react-icons/fa";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  // Watch for login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const navigateValue = () => {
    navigate("/creatPitch");
  };

  return (
    <div className=" bg-[#1f242d] font-[Poppins]">
      {/* ===== NAVBAR ===== */}
      <nav className="w-full bg-gradient-to-r bg-[#1f242d] text-white shadow-md fixed top-0 left-0 z-50 flex justify-between items-center px-10 py-3">
        <h2 className="text-2xl font-semibold tracking-wide text-white">
          My App
        </h2>

        <div className="relative">
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 bg-gradient-to-br from-white to-gray-100 border border-gray-300 px-4 py-1.5 rounded-full cursor-pointer hover:from-gray-50 hover:to-gray-200 transition-all duration-300"
          >
            <span className="text-gray-800 font-medium hidden sm:inline">
              {user?.displayName || "User"}
            </span>
            <FaUserCircle size={28} color="#333" />
          </div>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg animate-fadeIn overflow-hidden">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 font-semibold hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ===== HOME CONTENT ===== */}
      <div className="pt-28 flex flex-col items-center text-center px-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
          Welcome, {user?.displayName?.split(" ")[1] || "User"} 👋
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          You are now logged in!
        </p>

        <button
          onClick={navigateValue}
          className="mt-8 bg-[#7cf03d] text-[#1f242d] text- px-6 py-2 rounded-lg font-bold hover:bg-[#63bf32] transition-all cursor-pointer duration-300 shadow-md"
        >
          Create New Pitch
        </button>
      </div>
    </div>
  );
}
