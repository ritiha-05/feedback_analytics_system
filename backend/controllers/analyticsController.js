const Feedback = require("../models/Feedback");
const Event = require("../models/Event");
const Session = require("../models/Session");

/* ================================
   SUMMARY
================================ */

exports.summary = async (req, res) => {

  const totalFeedback = await Feedback.countDocuments();

  const negative = await Feedback.countDocuments({
    sentiment: "negative"
  });

  const negativeRate =
    totalFeedback === 0
      ? "0%"
      : Math.round((negative / totalFeedback) * 100) + "%";

  const interventionsTriggered = await Event.countDocuments({
    type: "rageClick"
  });

  res.json({
    totalFeedback,
    negativeRate,
    interventionsTriggered
  });
};

/* ================================
   TRENDS (Keep your existing logic)
================================ */
exports.trends = async (req, res) => {
  try {
    const data = await Feedback.aggregate([
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt"
              }
            }
          },
          positive: {
            $sum: {
              $cond: [{ $eq: ["$sentiment", "positive"] }, 1, 0]
            }
          },
          neutral: {
            $sum: {
              $cond: [{ $eq: ["$sentiment", "neutral"] }, 1, 0]
            }
          },
          negative: {
            $sum: {
              $cond: [{ $eq: ["$sentiment", "negative"] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          day: "$_id.date",
          positive: 1,
          neutral: 1,
          negative: 1
        }
      },
      { $sort: { day: 1 } }
    ]);

    // fallback if empty
    if (!data || data.length === 0) {
      return res.json([
        { day: "Mon", positive: 2, neutral: 1, negative: 3 },
        { day: "Tue", positive: 4, neutral: 2, negative: 1 }
      ]);
    }

    res.json(data);

  } catch (err) {
    console.error(err);

    res.json([
      { day: "Mon", positive: 2, neutral: 1, negative: 3 },
      { day: "Tue", positive: 4, neutral: 2, negative: 1 }
    ]);
  }
};
/* ================================
   INSIGHTS — REAL DATA RESTORED
================================ */

exports.insights = async (req, res) => {

  const rageClicks = await Event.countDocuments({
    type: "rageClick"
  });

  const deadClicks = await Event.countDocuments({
    type: "deadClick"
  });

  const idle = await Event.countDocuments({
    type: "longIdle"
  });

  const positive = await Feedback.countDocuments({
    sentiment: "positive"
  });

  const neutral = await Feedback.countDocuments({
    sentiment: "neutral"
  });

  const negative = await Feedback.countDocuments({
    sentiment: "negative"
  });

  /* ⭐ REAL HIGH RISK SESSIONS */
  const highRiskSessions = await Session.find({
    riskScore: { $gte: 20 }
  })
    .sort({ riskScore: -1 })
    .limit(20);

  res.json({
    behaviour: {
      rageClicks,
      deadClicks,
      idle
    },
    sentiment: {
      positive,
      neutral,
      negative
    },
    highRiskSessions
  });
};
