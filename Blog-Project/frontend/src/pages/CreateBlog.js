import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await API.post("posts/", { title, content });
    navigate("/blogs");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Blog</h2>
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <br /><br />
      <textarea placeholder="Content" onChange={(e) => setContent(e.target.value)} />
      <br /><br />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default CreateBlog;
