import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewPost.css";

export default function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`posts/${id}/`);
        setPost(res.data);
      } catch {
        alert("Failed to load post");
        navigate("/blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Recently";
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="view-page">
        <div className="view-loading">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="view-page">
      <div className="view-topbar">
        <button className="back-link" onClick={() => navigate("/blogs")}>
          ← Back to posts
        </button>
        <button className="edit-link" onClick={() => navigate(`/edit/${id}`)}>
          ✎ Edit
        </button>
      </div>

      <article className="view-article">

        {/* Cover image — only shown if post has one */}
        {post?.image && (
          <div className="view-cover">
            <img
              src={`https://akshitgode.pythonanywhere.com/media/${post.image}`}
              alt={post.title}
              className="cover-img"
            />
          </div>
        )}

        <header className="view-header">
          <h1>{post?.title}</h1>
          <div className="view-meta">
            <span>✍ {post?.author?.username}</span>
            <span>·</span>
            <span>📅 {formatDate(post?.created_at)}</span>
          </div>
        </header>

        <div className="view-divider" />

        <div className="view-content">
          {post?.content?.split("\n").map((para, i) =>
            para.trim() ? <p key={i}>{para}</p> : <br key={i} />
          )}
        </div>
      </article>
    </div>
  );
}