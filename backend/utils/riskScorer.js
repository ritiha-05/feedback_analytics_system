// utils/riskScorer.js

const riskWeights = {
  rageClick: 20,
  deadClick: 8,
  confusedMove: 12,
  longIdle: 10,
  click: 1
};

/* ================================
   EVENT BASED RISK
================================ */

exports.calculateEventRisk = (event) => {
  const baseScore = riskWeights[event.type] || 20;

  let contextBoost = 0;

  // ⭐ Context-aware boost
  if (event.type === "rageClick" && event.page === "billing") {
    contextBoost += 10;
  }

  return baseScore + contextBoost;
};

/* ================================
   SENTIMENT BASED RISK
================================ */

exports.calculateSentimentRisk = (sentiment) => {

  if (sentiment === "negative") return 20;   // strong risk increase
  if (sentiment === "neutral") return 5;     // slight risk
  if (sentiment === "positive") return -5;   // reduce risk

  return 0;
};

