import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // LOGIN
  const login = async () => {
    try {
      setLoading(true);

      const res = await API.post("login/", { username, password });
      localStorage.setItem("token", res.data.token);

      navigate("/blogs");
    } catch {
      alert("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const register = async () => {
    try {
      setLoading(true);

      await API.post("register/", { username, password });
      alert("Registered successfully. Now login.");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>MINI BLOG APP✨</h1>
        <h2>Welcome Back 👋</h2>

        {/* Username */}
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password with eye icon */}
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        {/* Login button with spinner */}
        <button className="btn-login" onClick={login} disabled={loading}>
          {loading ? <span className="spinner"></span> : "Login"}
        </button>

        {/* Register button */}
        <button className="btn-register" onClick={register} disabled={loading}>
          {loading ? <span className="spinner"></span> : "Register"}
        </button>
      </div>
    </div>
  );
}
