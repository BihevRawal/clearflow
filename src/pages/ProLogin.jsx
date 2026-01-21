import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { db } from "../firebase";
import "../css/Login.css";

export default function ProLogin() {
  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
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

      const valid = await bcrypt.compare(secret, user.secretKey);

      if (!valid) {
        setError("Invalid secret key");
        setLoading(false);
        return;
      }

      // Save session
      localStorage.setItem(
        "proUser",
        JSON.stringify({
          name: user.name,
          username: user.username,
          email: user.email,
          profession: user.profession,
        })
      );

      window.location.href = "/pro";
    } catch (err) {
  alert(err.message)
}


    setLoading(false);
  };

  return (
    <div className="loginWrap">
      <form className="loginCard" onSubmit={login}>
        <h2>Professional Login</h2>
        <p>Access your assigned jobs</p>

        {error && <div className="errorBox">{error}</div>}

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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
