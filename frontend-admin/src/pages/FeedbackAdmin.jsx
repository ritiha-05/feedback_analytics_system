import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function FeedbackAdmin() {

  const navigate = useNavigate();

  const [feedbackList, setFeedbackList] = useState([]);

  const fetchFeedback = async () => {
    try {
      const res = await api.get("/feedback");
      setFeedbackList(res.data);
    } catch (err) {
      console.log("Error fetching feedback:", err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      await api.delete(`/feedback/${id}`);
      fetchFeedback();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <Layout>
      <div style={{ padding: 40, maxWidth: 900, margin: "0 auto" }}>

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginBottom: 20,
            padding: "8px 16px",
            background: "#6366F1",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          ← Back to Dashboard
        </button>

        <h1>Feedback Management</h1>

        {feedbackList.length === 0 && (
          <p style={{ marginTop: 20 }}>No feedback available.</p>
        )}

        {feedbackList.map((fb) => (
          <div
            key={fb._id}
            style={{
              background: "white",
              padding: 16,
              borderRadius: 10,
              marginTop: 15,
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
            }}
          >
            <div style={{ fontWeight: 600 }}>
              Session: {fb.sessionId}
            </div>

            <div style={{ marginTop: 6 }}>
              {fb.message}
            </div>

            <button
              onClick={() => deleteFeedback(fb._id)}
              style={{
                marginTop: 10,
                padding: "6px 14px",
                background: "#EF4444",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}