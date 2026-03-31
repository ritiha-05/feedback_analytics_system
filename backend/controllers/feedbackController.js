const Feedback = require("../models/Feedback");
const Session = require("../models/Session");

const { detectSentiment } = require("../utils/sentimentAnalyzer");
const { calculateSentimentRisk } = require("../utils/riskScorer");

/* =================================================
   SUBMIT FEEDBACK + SENTIMENT RISK UPDATE
================================================= */

exports.submitFeedback = async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
      return res.status(400).json({
        msg: "sessionId and message are required"
      });
    }

    /* ⭐ Detect sentiment from message */
    const sentiment = detectSentiment(message);

    /* ⭐ Calculate risk impact from sentiment */
    const riskChange = calculateSentimentRisk(sentiment);

    /* ⭐ Update session risk score */
    const updatedSession = await Session.findOneAndUpdate(
      { sessionId },
      { $inc: { riskScore: riskChange } },
      { new: true, upsert: true }
    );

    /* ⭐ Save feedback */
    const feedback = await Feedback.create({
      sessionId,
      message,
      sentiment,
      riskScore: updatedSession.riskScore
    });

    res.json({
      success: true,
      sentiment,
      riskAdded: riskChange,
      totalRisk: updatedSession.riskScore
    });

  } catch (err) {
    console.error("Feedback error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

