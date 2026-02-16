import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";

function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("posts/").then((res) => {
      const blog = res.data.find((b) => b.id === parseInt(id));
      setTitle(blog.title);
      setContent(blog.content);
    });
  }, [id]);

  const handleUpdate = async () => {
    await API.put(`posts/${id}/`, { title, content });
    navigate("/blogs");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Blog</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <br /><br />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <br /><br />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditBlog;
