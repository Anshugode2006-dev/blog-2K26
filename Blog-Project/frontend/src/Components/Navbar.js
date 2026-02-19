import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await API.get("/api/logout/");
    navigate("/");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: 12,
      background: "black",
      color: "white"
    }}>
      <h2>My Blog</h2>

      <div>
        <Link to="/blogs" style={{ color: "white", marginRight: 10 }}>Blogs</Link>
        <Link to="/create" style={{ color: "white", marginRight: 10 }}>Create</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
