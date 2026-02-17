import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/api/logout/");
      alert("Logged out successfully 👋");
      navigate("/");
    } catch (err) {
      alert("Logout failed ❌");
    }
  };

  return (
    <div className="navbar">
      <h2 className="logo" onClick={() => navigate("/blogs")}>
        MyBlog 📝
      </h2>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
