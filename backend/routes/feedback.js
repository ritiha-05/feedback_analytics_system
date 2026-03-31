const router = require("express").Router();
const {
  submitFeedback,
  getAllFeedback,
  updateFeedback,
  deleteFeedback
} = require("../controllers/feedbackController");

// POST /api/feedback
router.post("/", submitFeedback);

router.get("/", getAllFeedback);

router.put("/:id", updateFeedback);

router.delete("/:id", deleteFeedback);

module.exports = router;
