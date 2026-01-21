import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import WorkPortal from "./pages/WorkPortal";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home"; // your main website

export default function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* PROFESSIONAL */}
      <Route path="/workportal" element={<WorkPortal />} />

    </Routes>
  );
}
