// utils/sentimentAnalyzer.js

const positiveWords = [
  "good",
  "great",
  "love",
  "awesome",
  "nice",
  "excellent",
  "happy",
  "smooth",
  "easy",
  "best"
];

const negativeWords = [
  "bad",
  "hate",
  "terrible",
  "confusing",
  "slow",
  "worst",
  "frustrating",
  "broken",
  "issue"
];

exports.detectSentiment = (text = "") => {
  const lower = text.toLowerCase();

  let score = 0;

  positiveWords.forEach(word => {
    if (lower.includes(word)) score += 1;
  });

  negativeWords.forEach(word => {
    if (lower.includes(word)) score -= 1;
  });

  if (score > 0) return "positive";
  if (score < 0) return "negative";
  return "neutral";
};
