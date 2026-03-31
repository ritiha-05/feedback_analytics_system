export default function BillingPage() {
  return (
    <div style={pageStyle}>
      <h1>Billing & Plans 💳</h1>

      <div style={planCard}>
        <h3>Starter Plan</h3>
        <p>Basic analytics monitoring</p>
        <button style={btn}>Select</button>
      </div>

      <div style={planCard}>
        <h3>Pro Plan</h3>
        <p>Advanced behavioural intelligence</p>
        <button style={btn}>Upgrade</button>
      </div>
    </div>
  );
}

const pageStyle = {
  padding: 40,
  background: "#F8FAFC",
  minHeight: "100vh"
};

const planCard = {
  background: "white",
  padding: 25,
  borderRadius: 14,
  marginTop: 20
};

const btn = {
  marginTop: 10,
  background: "#6366F1",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: 8
};
