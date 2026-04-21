import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { disconnectSocket } from "../utils/socket";
import { useTheme } from "../utils/ThemeContext";

const NavBar = () => {
  const { isDark, toggleTheme } = useTheme();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropOpen, setDropOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      disconnectSocket(); // clean up socket on logout
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="dc-navbar">
      <Link to={user ? "/feed" : "/"} className="dc-logo">
        <span>Dev</span>Circle
      </Link>

      <div className="dc-nav-right">
        <button 
          onClick={toggleTheme} 
          style={{ background: "transparent", border: "none", fontSize: "1.2rem", cursor: "pointer", marginRight: "1rem" }}
          title="Toggle Dark Mode"
        >
          {isDark ? "☀️" : "🌙"}
        </button>

        {user ? (
          <>
            <span className="dc-welcome">Welcome, {user.firstName} 👋</span>
            <div style={{ position: "relative" }}>
              <button className="dc-avatar-btn" onClick={() => setDropOpen((o) => !o)}>
                <img className="dc-avatar-img" alt="user photo" src={user.photoUrl} />
              </button>
              <div className={`dc-dropdown ${dropOpen ? "open" : ""}`}>
                <Link to="/feed" onClick={() => setDropOpen(false)}>🏠 Feed</Link>
                <Link to="/profile" onClick={() => setDropOpen(false)}>👤 Profile <span className="dc-badge">New</span></Link>
                <Link to="/connections" onClick={() => setDropOpen(false)}>🤝 Connections</Link>
                <Link to="/requests" onClick={() => setDropOpen(false)}>📬 Requests</Link>
                <Link to="/premium" onClick={() => setDropOpen(false)}>⭐ Premium</Link>
                <button onClick={handleLogout}>🚪 Logout</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: "none", padding: "0.5rem 1.2rem", borderRadius: "8px", fontWeight: 600, fontSize: "0.9rem", color: "#374151", border: "1.5px solid #e5e7eb", background: "white" }}>Sign In</Link>
            <Link to="/login" className="btn-primary" style={{ textDecoration: "none", padding: "0.5rem 1.2rem", borderRadius: "8px", fontWeight: 600, fontSize: "0.9rem" }}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
