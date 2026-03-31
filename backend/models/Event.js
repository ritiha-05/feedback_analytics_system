const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  page: String,

  timestamp: {
    type: Date,
    default: Date.now
  },

  metadata: {
    type: Object,
    default: {}
  }
});

module.exports = mongoose.model("Event", EventSchema);
