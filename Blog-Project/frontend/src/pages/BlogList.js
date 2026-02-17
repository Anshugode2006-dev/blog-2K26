import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const API = "http://127.0.0.1:8000/api";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // 🔐 Load blogs after login
  useEffect(() => {
    fetch(`${API}/posts/`, {
      credentials: "include",   // VERY IMPORTANT for Django session
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/"); // not logged in
          return [];
        }
        return res.json();
      })
      .then((data) => setBlogs(data))
      .catch(() => navigate("/"));
  }, [navigate]);

  // 🗑 Delete blog
  const deleteBlog = async (id) => {
    await fetch(`${API}/posts/${id}/`, {
      method: "DELETE",
      credentials: "include",
    });

    setBlogs(blogs.filter((b) => b.id !== id));
  };

  return (
    <div className="container">
      <Navbar />

      <button className="create-btn" onClick={() => navigate("/create")}>
        + Create Blog
      </button>

      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="card">
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>

            <button onClick={() => navigate(`/edit/${blog.id}`)}>
              Edit
            </button>

            <button onClick={() => deleteBlog(blog.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogList;
