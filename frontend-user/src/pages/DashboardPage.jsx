export default function DashboardPage() {
  return (
    <div style={pageStyle}>
      <h1>Usage Dashboard 📊</h1>

      <div style={card}>
        <h3>Session Activity</h3>
        <p>User interactions and behaviour signals appear here.</p>
      </div>

      <div style={card}>
        <h3>Experience Score</h3>
        <p>Real-time engagement monitoring.</p>
      </div>
    </div>
  );
}

const pageStyle = {
  padding: 40,
  background: "#F8FAFC",
  minHeight: "100vh"
};

const card = {
  background: "white",
  padding: 25,
  borderRadius: 14,
  marginTop: 20
};
