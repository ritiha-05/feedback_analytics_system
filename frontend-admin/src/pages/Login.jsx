import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      /* ⭐ SAVE TOKEN */
      localStorage.setItem("token", res.data.token);

      /* ⭐ REDIRECT TO DASHBOARD */
      navigate("/dashboard");

    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F1F5F9"
      }}
    >
      <div
        style={{
          background: "white",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          width: 300
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Admin Login 🔐</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        {error && (
          <p style={{ color: "red", marginBottom: 10 }}>
            {error}
          </p>
        )}

        <button onClick={handleLogin} style={btn}>
          Login
        </button>
      </div>
    </div>
  );
}

const input = {
  width: "90%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 6,
  border: "1px solid #CBD5F5"
};

const btn = {
  width: "99%",
  padding: 10,
  background: "#6366F1",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
};
