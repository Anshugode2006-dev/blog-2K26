import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    fetch("/api/logout/");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>MiniBlog</h2>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;
