const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  sessionId: String,
  startedAt: { type: Date, default: Date.now },
  riskScore: {
  type: Number,
  default: 0
}

});

module.exports = mongoose.model("Session", SessionSchema);
