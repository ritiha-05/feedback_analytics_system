const Event = require("../models/Event");
const Session = require("../models/Session");
const { calculateRisk } = require("../utils/riskScorer");

exports.processEvent = async (payload) => {
  const {
    sessionId,
    eventType,
    page,
    timestamp,
    metadata
  } = payload;

  // 1️⃣ Save event
  const savedEvent = await Event.create({
    sessionId,
    type: eventType,
    page,
    timestamp,
    metadata
  });

  // 2️⃣ Calculate risk
  const riskIncrease = calculateRisk(savedEvent);

  // 3️⃣ Update session
  const updatedSession = await Session.findOneAndUpdate(
    { sessionId },
    { $inc: { riskScore: riskIncrease } },
    { new: true, upsert: true }
  );

  // 4️⃣ Preventive trigger
  let preventiveAction = null;

  if (updatedSession.riskScore >= 50) {
    preventiveAction = "SHOW_HELP_TOOLTIP";
  }

  return {
    savedEvent,
    riskAdded: riskIncrease,
    totalRisk: updatedSession.riskScore,
    preventiveAction
  };
};
