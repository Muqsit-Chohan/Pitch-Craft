import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FaUserCircle } from "react-icons/fa";
import "./dashboard.css"; // ✅ import CSS

export default function Home() {
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
    <>
      <div className="home-container">
        {/* Navbar */}
        <nav className="navbar">
          <h2>My App</h2>

          <div className="profile-container">
            <div className="profile-btn" onClick={() => setShowMenu(!showMenu)}>
              <span className="profile-name">
                {user?.displayName || "User"}
              </span>
              <FaUserCircle size={28} color="#333" />
            </div>

            {showMenu && (
              <div className="dropdown-menu">
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Main content */}
        <div className="home-content">
          <h1>Welcome, {user?.displayName?.split(" ")[0] || "User"} 👋</h1>
          <p>You are now logged in!</p>
        </div>

        <div className="">
          <button onClick={navigateValue}>Create New Pich</button>
        </div>

      </div>
    </>
  );
}
