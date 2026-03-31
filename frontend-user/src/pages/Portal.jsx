import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { getSessionId } from "../utils/session";
import FeedbackForm from "../components/FeedbackForm";
import { useAssistant } from "../context/AssistantContext";

export default function Portal() {

  const navigate = useNavigate();
  const sessionId = getSessionId();
  const { openAssistant } = useAssistant();

  /* ==============================
     REAL SaaS BEHAVIOUR ENGINE
  ============================== */

  useEffect(() => {

    let clickCount = 0;
    let lastMoveTime = Date.now();
    let lastEventTime = 0;
    let assistantTriggered = false;
    let idleTimer;
    let lastX = 0;
    let lastY = 0;

    const COOLDOWN = 3000;

    const sendEvent = async (type) => {

      if (Date.now() - lastEventTime < COOLDOWN) return;
      lastEventTime = Date.now();

      try {
        const res = await api.post("/events", {
          sessionId,
          eventType: type,
          page: "portal"
        });

        console.log("EVENT:", type, res.data);

        /* ⭐ FIXED GLOBAL ASSISTANT TRIGGER */
        if (
          res.data.preventiveAction === "SHOW_HELP_TOOLTIP" &&
          !assistantTriggered
        ) {
          assistantTriggered = true;

          setTimeout(() => {
            openAssistant("Need help? I'm here 😊");
          }, 700);
        }

      } catch (err) {
        console.log("Event error:", err);
      }
    };

    /* ===== Rage Click ===== */
    const handleClick = (e) => {

      clickCount++;

      setTimeout(() => {
        clickCount = 0;
      }, 1000);

      if (clickCount >= 3) {
        sendEvent("rageClick");
        clickCount = 0;
      }

      if (e.target.tagName === "DIV") {
        sendEvent("deadClick");
      }
    };

    /* ===== Confused Movement ===== */
    const handleMouseMove = (e) => {

      const dx = Math.abs(e.clientX - lastX);
      const dy = Math.abs(e.clientY - lastY);

      if (dx > 120 && dy > 120) {
        sendEvent("confusedMove");
      }

      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveTime = Date.now();
    };

    /* ===== Idle Detection ===== */
    idleTimer = setInterval(() => {
      if (Date.now() - lastMoveTime > 12000) {
        sendEvent("longIdle");
        lastMoveTime = Date.now();
      }
    }, 5000);

    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(idleTimer);
    };

  }, []);

  /* ==============================
     UI — SAME AS BEFORE
  ============================== */

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8FAFC",
        padding: "40px 60px"
      }}
    >
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: 36, color: "#0F172A" }}>
          Customer Experience Dashboard 🚀
        </h1>

        <p style={{ color: "#64748B", marginTop: 8 }}>
          Behaviour intelligence detects frustration before feedback turns negative.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
          marginBottom: 30
        }}
      >
        <div style={cardStyle}>
          <h3>📊 Usage Overview</h3>
          <p style={textStyle}>Monitor analytics and behaviour insights.</p>

          <button
            style={primaryBtn}
            onClick={() => navigate("/dashboard")}
          >
            Open Dashboard
          </button>
        </div>

        <div style={cardStyle}>
          <h3>💳 Billing & Plans</h3>
          <p style={textStyle}>Manage subscriptions and pricing.</p>

          <button
            style={greenBtn}
            onClick={() => navigate("/billing")}
          >
            View Plans
          </button>
        </div>

        <div style={cardStyle}>
          <h3>⚙ Settings</h3>
          <p style={textStyle}>Update account configuration.</p>

          <button
            style={purpleBtn}
            onClick={() => navigate("/settings")}
          >
            Open Settings
          </button>
        </div>
      </div>

      <div style={{ ...cardStyle, marginBottom: 40 }}>
        <h3>📈 Behaviour Intelligence</h3>

        <p style={{ ...textStyle, maxWidth: 600 }}>
          Rage clicks, dead clicks and idle sessions are tracked
          in real-time to prevent negative feedback.
        </p>
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginBottom: 15 }}>Give Feedback ✨</h2>
        <FeedbackForm sessionId={sessionId} />
      </div>
    </div>
  );
}

/* ==============================
   STYLES
============================== */

const cardStyle = {
  background: "white",
  padding: 25,
  borderRadius: 16,
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
};

const textStyle = {
  color: "#475569",
  marginTop: 10,
  marginBottom: 20
};

const primaryBtn = {
  background: "#3B82F6",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer"
};

const greenBtn = {
  background: "#10B981",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer"
};

const purpleBtn = {
  background: "#6366F1",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer"
};
