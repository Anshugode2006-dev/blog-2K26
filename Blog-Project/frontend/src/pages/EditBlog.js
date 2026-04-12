import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";
import "./EditBlog.css";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`posts/${id}/`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch {
        alert("Failed to load blog");
        navigate("/blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const update = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty");
      return;
    }
    try {
      setSaving(true);

      // FormData required after image support was added
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      await API.put(`posts/${id}/`, formData);

      navigate("/blogs");
    } catch {
      alert("Update failed ❌");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-page">
        <div className="edit-card">
          <p style={{ color: "var(--muted)", textAlign: "center" }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-page">
      <div className="edit-card">
        <button className="back-link" onClick={() => navigate("/blogs")}>
          ← Back to posts
        </button>

        <h2>Edit Post</h2>
        <p className="subtitle">Make your changes below</p>

        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            rows="7"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Post content"
          />
        </div>

        <div className="edit-actions">
          <button
            className="edit-btn cancel-btn"
            onClick={() => navigate("/blogs")}
          >
            Cancel
          </button>
          <button
            className="edit-btn update-btn"
            onClick={update}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}