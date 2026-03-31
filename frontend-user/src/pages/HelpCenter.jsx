import { useNavigate } from "react-router-dom";

export default function HelpCenter() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: 40,
        minHeight: "100vh",
        background: "#F8FAFC"
      }}
    >
      <h1 style={{ marginBottom: 20 }}>
        Help Center 🆘
      </h1>

      <div
        style={{
          background: "white",
          padding: 30,
          borderRadius: 14,
          maxWidth: 700,
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
        }}
      >
        <h3>Need Assistance?</h3>

        <p style={{ marginTop: 10 }}>
          📧 Email: support@feedbackai.com
        </p>

        <p>
          📞 Phone: +91 98765 43210
        </p>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: 25,
            padding: "10px 18px",
            borderRadius: 8,
            border: "none",
            background: "#6366F1",
            color: "white",
            cursor: "pointer"
          }}
        >
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
}

