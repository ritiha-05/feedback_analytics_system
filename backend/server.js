const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* ---------- Global Middleware ---------- */
app.use(cors());
app.use(express.json());

const logger = require("./middleware/logger");
app.use(logger);

/* ---------- Routes ---------- */
app.use("/api/events", require("./routes/events"));
app.use("/api/feedback", require("./routes/feedback"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/auth", require("./routes/auth"));

/* ---------- Server ---------- */
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ status: "Backend is healthy" });
});



