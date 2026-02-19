import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogList from "./pages/BlogList";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DEFAULT → LOGIN */}
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
      </Routes>
    </BrowserRouter>
  );
}
