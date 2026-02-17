import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // reuse same beautiful style

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // for proper redirect

  const handleRegister = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        password,
      });

      alert("Account created successfully 🎉");

      // redirect to login page
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2 className="title">Create Account ✨</h2>

        <input
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleRegister}>
          Register
        </button>

        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;
