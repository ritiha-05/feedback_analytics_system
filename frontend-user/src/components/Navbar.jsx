import { useNavigate, useLocation } from "react-router-dom";
import HelpTooltip from "./HelpTooltip";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navStyle = (path) => ({
    marginRight: 20,
    cursor: "pointer",
    fontWeight: location.pathname === path ? "bold" : "normal",
    color: location.pathname === path ? "#6366F1" : "#334155",
    transition: "0.2s"
  });

  return (
    <>
      {/* ⭐ TOP NAVBAR */}
      <div
        style={{
          height: 70,
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}
      >
        <h2 style={{ color: "#1E293B" }}>
          Feedback Portal ✨
        </h2>

        <div>
          <span
            style={navStyle("/")}
            onClick={() => navigate("/")}
          >
            🏠 Home
          </span>

          
        </div>
      </div>

      {/* ⭐ GLOBAL FLOATING ASSISTANT */}
      <HelpTooltip />
    </>
  );
}
