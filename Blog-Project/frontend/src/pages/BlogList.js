import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./BlogList.css";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/posts/");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete blog
  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm("Delete this blog?");
    if (!confirmDelete) return;

    try {
      await fetch(`/api/posts/${id}/`, { method: "DELETE" });
      fetchBlogs();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="blog-page">
      <Navbar />

      <div className="top-bar">
        <h2 className="page-title">✨ Your Blogs</h2>

        <button className="create-btn" onClick={() => navigate("/create")}>
          + Create Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <p className="no-blog">No blogs available.</p>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>

              <div className="card-actions">
                <button
                  className="btn edit"
                  onClick={() => navigate(`/edit/${blog.id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn delete"
                  onClick={() => deleteBlog(blog.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogList;
