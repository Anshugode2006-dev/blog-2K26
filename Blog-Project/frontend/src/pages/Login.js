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

  const handleKey = (e) => { if (e.key === "Enter") login(); };

  return (
    <div className="login-container">
      <div className="login-card">
      <h1>Mini Blog App</h1>
        <h2>Sign in to your account</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          autoComplete="username"
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKey}
            autoComplete="current-password"
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        <button className="btn-login" onClick={login} disabled={loading}>
          {loading ? <span className="spinner" /> : "Sign in"}
        </button>

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Create account</span>
        </p>
      </div>
    </div>
  );
}