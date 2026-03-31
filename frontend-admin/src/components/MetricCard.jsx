export default function MetricCard({ title, value, color }) {
  return (
    <div
      style={{
        flex: 1,
        padding: 20,
        background: color,
        borderRadius: 14,
        color: "white",
        boxShadow: "0 6px 14px rgba(0,0,0,0.08)"
      }}
    >
      <p style={{ opacity: 0.9 }}>{title}</p>
      <h2 style={{ marginTop: 10 }}>{value}</h2>
    </div>
  );
}

