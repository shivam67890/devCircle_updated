import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            {isLoginForm ? "👋" : "🎉"}
          </div>
          <h2>{isLoginForm ? "Welcome back" : "Create account"}</h2>
          <p>{isLoginForm ? "Sign in to your DevCircle account" : "Join thousands of developers today"}</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        {!isLoginForm && (
          <>
            <div className="dc-form-group">
              <label className="dc-label">First Name</label>
              <input className="dc-input" type="text" value={firstName} placeholder="John" onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="dc-form-group">
              <label className="dc-label">Last Name</label>
              <input className="dc-input" type="text" value={lastName} placeholder="Doe" onChange={(e) => setLastName(e.target.value)} />
            </div>
          </>
        )}

        <div className="dc-form-group">
          <label className="dc-label">Email Address</label>
          <input className="dc-input" type="email" value={emailId} placeholder="john@example.com" onChange={(e) => setEmailId(e.target.value)} />
        </div>
        <div className="dc-form-group">
          <label className="dc-label">Password</label>
          <input className="dc-input" type="password" value={password} placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="btn-primary login-btn" onClick={isLoginForm ? handleLogin : handleSignUp}>
          {isLoginForm ? "Sign In →" : "Create Account →"}
        </button>

        <div className="login-toggle">
          {isLoginForm ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => { setIsLoginForm((v) => !v); setError(""); }}>
            {isLoginForm ? "Sign Up" : "Sign In"}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Login;
