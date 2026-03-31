import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";
import MetricCard from "../components/MetricCard";

export default function Dashboard() {

  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [insights, setInsights] = useState(null);
  const [highlightedSessions, setHighlightedSessions] = useState([]);

  const prevInsightsRef = useRef(null);

  const fetchData = async () => {
    try {
      const summaryRes = await api.get("/analytics/summary");
      setSummary(summaryRes.data);

      const insightsRes = await api.get("/analytics/insights");
      const newInsights = insightsRes.data;

      // detect changed risk sessions
      if (prevInsightsRef.current) {
        const newIds = (newInsights.highRiskSessions || [])
          .filter((s) => {
            const old = prevInsightsRef.current.highRiskSessions?.find(
              (o) => o._id === s._id
            );
            return !old || old.riskScore !== s.riskScore;
          })
          .map((s) => s._id);

        if (newIds.length > 0) {
          setHighlightedSessions(newIds);
          setTimeout(() => setHighlightedSessions([]), 1200);
        }
      }

      prevInsightsRef.current = newInsights;
      setInsights(newInsights);

    } catch (err) {
      console.log("Analytics fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div style={{ padding: 40, maxWidth: 1100, margin: "0 auto" }}>

        <h1>Admin Intelligence Dashboard 🧠</h1>

        {/* Feedback Management Button */}
        <button
          onClick={() => navigate("/feedback")}
          style={{
            marginTop: 15,
            padding: "10px 18px",
            background: "#6366F1",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 500
          }}
        >
          Manage Feedback
        </button>

        {/* ================= OVERVIEW ================= */}
        {summary && (
          <section style={panel}>
            <h2>Overview 📊</h2>

            <div style={cardRow}>
              <MetricCard
                title="Total Feedback"
                value={summary.totalFeedback}
                color="#6366F1"
              />

              <MetricCard
                title="Negative Rate"
                value={summary.negativeRate}
                color="#6366F1"
              />

              <MetricCard
                title="Interventions"
                value={summary.interventionsTriggered}
                color="#6366F1"
              />
            </div>
          </section>
        )}

        {/* ================= INSIGHTS ================= */}
        {insights && (
          <>
            {/* SENTIMENT */}
            <section style={panel}>
              <h2>Sentiment Summary 💬</h2>

              <div style={cardRow}>
                <MetricCard
                  title="Positive"
                  value={insights?.sentiment?.positive}
                  color="#6366F1"
                />
                <MetricCard
                  title="Neutral"
                  value={insights?.sentiment?.neutral}
                  color="#6366F1"
                />
                <MetricCard
                  title="Negative"
                  value={insights?.sentiment?.negative}
                  color="#6366F1"
                />
              </div>
            </section>

            {/* BEHAVIOUR */}
            <section style={panel}>
              <h2>Behaviour Insights 🔎</h2>

              <div style={cardRow}>
                <MetricCard
                  title="Rage Clicks"
                  value={insights?.behaviour?.rageClicks}
                  color="#6366F1"
                />
                <MetricCard
                  title="Dead Clicks"
                  value={insights?.behaviour?.deadClicks}
                  color="#6366F1"
                />
                <MetricCard
                  title="Idle Sessions"
                  value={insights?.behaviour?.idle}
                  color="#6366F1"
                />
              </div>
            </section>

            {/* HIGH RISK SESSIONS */}
            <section style={panel}>
              <h3>High Risk Sessions ⚠️</h3>

              {insights?.highRiskSessions?.length === 0 && (
                <div style={{ marginTop: 10 }}>
                  ✨ All users are healthy — no risk detected.
                </div>
              )}

              {insights?.highRiskSessions?.map((s) => (
                <div
                  key={s._id}
                  style={{
                    ...riskCard,
                    ...(highlightedSessions.includes(s._id)
                      ? pulseStyle
                      : {})
                  }}
                >
                  <div style={{ fontWeight: 600 }}>
                    Session: {s.sessionId}
                  </div>

                  <div style={{ marginTop: 6, color: "#6366F1" }}>
                    Risk Score: {s.riskScore}
                  </div>
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}

/* ================= STYLES ================= */

const riskCard = {
  background: "white",
  padding: 12,
  borderRadius: 10,
  marginTop: 10,
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
};

const pulseStyle = {
  animation: "pulseGlow 1s ease",
  border: "2px solid #6366F1"
};

const panel = {
  marginTop: 30,
  background: "#F3F4F6",
  padding: 20,
  borderRadius: 12
};

const cardRow = {
  display: "flex",
  gap: 20,
  marginTop: 15
};