import { useAssistant } from "../context/AssistantContext";
import { useNavigate } from "react-router-dom";

export default function HelpTooltip() {

  const {
    assistantOpen,
    assistantVisible,
    message,
    openAssistant,
    closeAssistant
  } = useAssistant();

  const navigate = useNavigate();

  // ⭐ If not visible, render NOTHING
  if (!assistantVisible) return null;

  return (
    <>
      {/* FLOATING ICON */}
      {!assistantOpen && (
        <div
          onClick={() => openAssistant("Hi 👋 Need help?")}
          style={robotStyle}
        >
          🤖
        </div>
      )}

      {/* ASSISTANT PANEL */}
      {assistantOpen && (
        <div style={panelStyle}>
          <strong>Smart Assistant</strong>

          <p style={{ marginTop: 10 }}>{message}</p>

          <div style={{ marginTop: 12 }}>
            <button onClick={() => navigate("/help")} style={btnPrimary}>
              Open Help Center
            </button>

            <button onClick={closeAssistant} style={btnGhost}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const robotStyle = {
  position: "fixed",
  bottom: 25,
  right: 25,
  width: 60,
  height: 60,
  borderRadius: "50%",
  background: "#6366F1",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24,
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  zIndex: 9999
};

const panelStyle = {
  position: "fixed",
  bottom: 25,
  right: 25,
  width: 260,
  background: "white",
  padding: 16,
  borderRadius: 12,
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  zIndex: 9999
};

const btnPrimary = {
  background: "#6366F1",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: 6,
  marginRight: 8,
  cursor: "pointer"
};

const btnGhost = {
  background: "#E2E8F0",
  border: "none",
  padding: "6px 10px",
  borderRadius: 6,
  cursor: "pointer"
};
