import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { auth, db } from "../firebase";
import "../css/Login.css";

export default function Login() {
  const [mode, setMode] = useState("admin"); // admin | pro

  // admin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // professional
  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ---------------- ADMIN LOGIN ----------------
  const adminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("role", "admin");
      navigate("/admin");
    } catch {
      setError("Invalid admin credentials");
    }

    setLoading(false);
  };

  // ---------------- PROFESSIONAL LOGIN ----------------
  const proLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const q = query(
        collection(db, "professionals"),
        where("username", "==", username)
      );

      const snap = await getDocs(q);

      if (snap.empty) {
        setError("User not found");
        setLoading(false);
        return;
      }

      const user = snap.docs[0].data();

      const match = await bcrypt.compare(secret, user.secretKey);

      if (!match) {
        setError("Invalid secret key");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "proUser",
        JSON.stringify({
          name: user.name,
          username: user.username,
          email: user.email,
          profession: user.profession,
        })
      );

      navigate("/workportal");
    } catch {
      setError("Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="loginWrap">
      <div className="loginCard">

        <h2>Portal Login</h2>
        <p className="sub">Admin & Professional Access</p>

        {/* TOGGLE */}
        <div className="toggle">
          <button
            onClick={() => setMode("admin")}
            className={mode === "admin" ? "active" : ""}
          >
            Admin
          </button>

          <button
            onClick={() => setMode("pro")}
            className={mode === "pro" ? "active" : ""}
          >
            Professional
          </button>
        </div>

        {error && <div className="errorBox">{error}</div>}

        {/* ADMIN */}
        {mode === "admin" && (
          <form onSubmit={adminLogin}>
            <input
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button disabled={loading}>
              {loading ? "Logging in..." : "Login as Admin"}
            </button>
          </form>
        )}

        {/* PROFESSIONAL */}
        {mode === "pro" && (
          <form onSubmit={proLogin}>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Secret Key"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              required
            />

            <button disabled={loading}>
              {loading ? "Logging in..." : "Go to Work Portal"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
