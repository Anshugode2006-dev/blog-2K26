import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.css";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const create = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty");
      return;
    }
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image, image.name);
      }

      await API.post("posts/", formData);  // ← remove custom headers, let browser set them

      navigate("/blogs");
    } catch (e) {
      console.log(e.response?.data);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-page">
      <div className="create-card">
        <button className="back-link" onClick={() => navigate("/blogs")}>
          ← Back to posts
        </button>

        <h2>New Post</h2>
        <p className="subtitle">Share your thoughts with the world</p>

        <div className="form-group">
          <label>Title</label>
          <input
            placeholder="Give your post a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            placeholder="Write your post content here..."
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Image upload */}
        <div className="form-group">
          <label>
            Cover Image <span className="optional">(optional)</span>
          </label>

          {preview ? (
            <div className="image-preview-wrapper">
              <img src={preview} alt="Preview" className="image-preview" />
              <button className="remove-image" onClick={removeImage}>
                ✕ Remove
              </button>
            </div>
          ) : (
            <label className="upload-area" htmlFor="image-upload">
              <span className="upload-icon">🖼</span>
              <span className="upload-text">Click to upload a cover image</span>
              <span className="upload-hint">JPG, PNG, WEBP supported</span>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImage}
                style={{ display: "none" }}
              />
            </label>
          )}
        </div>

        <button className="btn-publish" onClick={create} disabled={loading}>
          {loading ? "Publishing..." : "✦ Publish Post"}
        </button>
      </div>
    </div>
  );
}