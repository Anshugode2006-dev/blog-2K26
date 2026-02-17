import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/register/",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,   
        }
      );

      alert("Registration successful ");

      navigate("/blogs");   
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "Registration failed ");
      } else {
        alert("Server error ");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Create Account </h2>

        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
