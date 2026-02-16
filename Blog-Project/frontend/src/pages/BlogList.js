import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("posts/").then((res) => setBlogs(res.data));
  }, []);

  const deleteBlog = async (id) => {
    await API.delete(`posts/${id}/`);
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Blogs</h2>
      <Link to="/create">Create Blog</Link>

      {blogs.map((b) => (
        <div key={b.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{b.title}</h3>
          <p>{b.content}</p>

          <Link to={`/edit/${b.id}`}>Edit</Link>
          <button onClick={() => deleteBlog(b.id)} style={{ marginLeft: 10 }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
