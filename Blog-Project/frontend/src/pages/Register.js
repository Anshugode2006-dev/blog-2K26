import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // shared styles

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      alert("Please enter username and password");
      return;
    }
    try {
      setLoading(true);
      await axios.post("https://akshitgode.pythonanywhere.com/api/register/", {
        username,
        password,
      });
      alert("Registration successful ✅");
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "Registration failed");
      } else {
        alert("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") handleRegister(); };

  return (
    <div className="login-container">
      <div className="login-card">
      <h1>Mini Blog App</h1>
        <h2>Create a new account</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          autoComplete="username"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKey}
          autoComplete="new-password"
        />

        <button className="btn-register" onClick={handleRegister} disabled={loading}>
          {loading ? <span className="spinner" /> : "Create account"}
        </button>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Sign in</span>
        </p>
      </div>
    </div>
  );
}