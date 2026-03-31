export default function SettingsPage() {
  return (
    <div style={pageStyle}>
      <h1>Settings ⚙️</h1>

      <div style={card}>
        <label>
          <input type="checkbox" /> Enable Smart Assistance
        </label>
      </div>

      <div style={card}>
        <label>
          <input type="checkbox" /> Behaviour Tracking Enabled
        </label>
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
  padding: 20,
  borderRadius: 14,
  marginTop: 20
};
