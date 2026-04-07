import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./BlogList.css";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const loadPosts = async () => {
    try {
      const res = await API.get("posts/");
      setPosts(res.data);
    } catch {
      alert("Failed to load posts. Please login again.");
      navigate("/");
    }
  };

  useEffect(() => { loadPosts(); }, []);

  const deletePost = async (e, id) => {
    e.stopPropagation(); // don't open the post
    if (!window.confirm("Delete this post?")) return;
    await API.delete(`posts/${id}/`);
    loadPosts();
  };

  const editPost = (e, id) => {
    e.stopPropagation(); // don't open the post
    navigate(`/edit/${id}`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Format date nicely if available
  const formatDate = (dateStr) => {
    if (!dateStr) return "Recently";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  };

  return (
    <div className="blog-page">
      {/* ── Navbar ── */}
      <div className="top-bar">
      <h2 className="page-title">My Blogs</h2>
        <div>
          <button
            className="create-btn primary"
            onClick={() => navigate("/create")}
          >
            ＋ New Post
          </button>
          <button className="create-btn ghost" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="blog-content">
        {posts.length === 0 ? (
          <div className="no-blog">
            <div className="empty-icon">✍️</div>
            <p>No posts yet. Write your first one!</p>
            <button
              className="create-btn primary"
              onClick={() => navigate("/create")}
            >
              ＋ Create Post
            </button>
          </div>
        ) : (
          <>
            <div className="section-header">
              <h3>Your posts</h3>
              <span className="post-count">{posts.length} total</span>
            </div>

            <div className="blog-grid">
              {posts.map((p) => (
                <div
                  className="blog-card"
                  key={p.id}
                  onClick={() => navigate(`/post/${p.id}`)}
                  title="Click to read full post"
                >
                  <div className="card-header">
                    {/* Title */}
                    <h3>{p.title}</h3>
                  </div>

                  {/* Content preview — clamped to 3 lines */}
                  <p className="excerpt">{p.content}</p>

                  <div className="card-footer">
                    <span className="card-meta">
                      📅 {formatDate(p.created_at)}
                    </span>

                    <div className="card-actions">
                      {/* Edit icon button */}
                      <button
                        className="icon-btn"
                        title="Edit post"
                        onClick={(e) => editPost(e, p.id)}
                      >
                        ✎
                      </button>
                      {/* Delete icon button */}
                      <button
                        className="icon-btn danger"
                        title="Delete post"
                        onClick={(e) => deletePost(e, p.id)}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}