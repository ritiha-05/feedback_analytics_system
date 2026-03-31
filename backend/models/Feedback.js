const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  sentiment: {
    type: String,
    enum: ["positive", "neutral", "negative"],
    default: "neutral"
  },

  riskScore: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
