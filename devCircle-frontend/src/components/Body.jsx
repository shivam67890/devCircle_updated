import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

// Routes that require authentication
const PROTECTED_ROUTES = ["/feed", "/profile", "/connections", "/requests", "/premium", "/chat"];

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    // If user already in store, just redirect from landing if needed
    if (userData) {
      if (location.pathname === "/") {
        navigate("/feed");
      }
      return;
    }

    try {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(res.data));
      // If logged-in user lands on "/" or "/login", redirect to feed
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/feed");
      }
    } catch (err) {
      const isProtected = PROTECTED_ROUTES.some((r) => location.pathname.startsWith(r));
      if (isProtected) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
