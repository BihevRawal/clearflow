import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({ children, role }) {

  if (role === "admin") {
    if (!auth.currentUser) {
      return <Navigate to="/login" />;
    }
  }

  if (role === "pro") {
    const pro = localStorage.getItem("proUser");
    if (!pro) {
      return <Navigate to="/login" />;
    }
  }

  return children;
}
