const Event = require("../models/Event");
const Session = require("../models/Session");
const { calculateEventRisk } = require("../utils/riskScorer");


exports.trackEvent = async (req, res) => {
  try {
    const { sessionId, eventType, page } = req.body;

    console.log("REQ BODY:", req.body);

    if (!sessionId || !eventType) {
      return res.status(400).json({
        msg: "Missing fields"
      });
    }

    /* ===========================
       SAVE EVENT
    =========================== */

    const savedEvent = await Event.create({
      sessionId,
      type: eventType,
      page
    });

    /* ===========================
       GET OR CREATE SESSION
    =========================== */

    let session = await Session.findOne({ sessionId });

    if (!session) {
      session = await Session.create({
        sessionId,
        riskScore: 0,
        lastActionAt: 0
      });
    }

    /* ===========================
       RISK CALCULATION
    =========================== */
    console.log("SAVED EVENT TYPE:", savedEvent.type);

    const riskAdded = calculateEventRisk(savedEvent);

    session.riskScore += riskAdded;

    /* ===========================
       PREVENTIVE LOGIC
    =========================== */

    let preventiveAction = null;

    const COOLDOWN = 15000;
    const now = Date.now();

    if (
      session.riskScore >= 20 &&
      now - (session.lastActionAt || 0) > COOLDOWN
    ) {
      preventiveAction = "SHOW_HELP_TOOLTIP";
      session.lastActionAt = now;
    }

    await session.save();

    res.json({
      success: true,
      riskAdded,
      totalRisk: session.riskScore,
      preventiveAction
    });

  } catch (err) {
    console.error("EVENT ERROR FULL:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
