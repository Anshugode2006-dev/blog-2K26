import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.css";   // ✅ added

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const create = async () => {
    await API.post("posts/", { title, content });
    navigate("/blogs");
  };

  return (
    <div className="create-page">     {/* ✅ changed wrapper */}
      <div className="create-card">   {/* ✅ added glass card */}
        <h2>Create Blog</h2>

        <input
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          rows="5"
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={create}>Create</button>
      </div>
    </div>
  );
}
