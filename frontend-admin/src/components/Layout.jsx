import { useNavigate, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItem = (path, label) => {
    const active = location.pathname === path;

    return (
      <div
        onClick={() => navigate(path)}
        style={{
          marginBottom: 12,
          padding: "10px 12px",
          borderRadius: 8,
          cursor: "pointer",
          background: active ? "#334155" : "transparent"
        }}
      >
        {label}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: 240,
          background: "#1E293B",
          color: "white",
          padding: 20
        }}
      >
        <h2 style={{ marginBottom: 30 }}>
          Feedback Analytics
        </h2>

        {navItem("/dashboard", "📊 Dashboard")}
        {navItem("/analytics", "📈 Analytics")}

        {/* LOGOUT BUTTON */}
        <button
          onClick={logout}
          style={{
            marginTop: 30,
            width: "100%",
            background: "#EF4444",
            color: "white",
            border: "none",
            padding: 10,
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, background: "#F1F5F9" }}>
        {children}
      </div>
    </div>
  );
}


