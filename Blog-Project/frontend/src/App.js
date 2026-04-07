import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogList from "./pages/BlogList";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import ViewPost from "./pages/ViewPost";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Login />} />
        <Route path="/register"   element={<Register />} />
        <Route path="/blogs"      element={<BlogList />} />
        <Route path="/create"     element={<CreateBlog />} />
        <Route path="/edit/:id"   element={<EditBlog />} />
        <Route path="/post/:id"   element={<ViewPost />} />  {/* ← NEW */}
      </Routes>
    </BrowserRouter>
  );
}