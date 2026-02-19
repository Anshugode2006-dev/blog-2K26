import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./BlogList.css";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const loadPosts = async () => {
    const res = await API.get("posts/");
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const deletePost = async (id) => {
    await API.delete(`posts/${id}/`);
    loadPosts();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="blog-page">
      <div className="top-bar">
        <h2 className="page-title">My Blogs</h2>
        <div>
          <button className="create-btn" onClick={() => navigate("/create")}>Create</button>
          <button className="create-btn" onClick={logout}>Logout</button>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="no-blog">No blogs yet.</p>
      ) : (
        <div className="blog-grid">
          {posts.map((p) => (
            <div className="blog-card" key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.content}</p>

              <div className="card-actions">
                <button className="btn edit" onClick={() => navigate(`/edit/${p.id}`)}>Edit</button>
                <button className="btn delete" onClick={() => deletePost(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
