import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  return children;
}
