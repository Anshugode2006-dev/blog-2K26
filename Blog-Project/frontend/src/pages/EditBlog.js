import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";
import "./EditBlog.css";   // ✅ correct CSS import

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch blog by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`posts/${id}/`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        alert("Failed to load blog");
        navigate("/blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  // Update blog
  const update = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty");
      return;
    }

    try {
      await API.put(`posts/${id}/`, { title, content });
      alert("Blog updated successfully ✅");
      navigate("/blogs");
    } catch {
      alert("Update failed ❌");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="edit-page">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="edit-page">
      <div className="edit-card">
        <h2>Edit Blog</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />

        <div className="edit-actions">
          <button className="edit-btn update-btn" onClick={update}>
            Update
          </button>

          <button
            className="edit-btn cancel-btn"
            onClick={() => navigate("/blogs")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
