const mongoose = require("mongoose");

const RuleSchema = new mongoose.Schema({
  threshold: Number,
  action: String
});

module.exports = mongoose.model("Rule", RuleSchema);
