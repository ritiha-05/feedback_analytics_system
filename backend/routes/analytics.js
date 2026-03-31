const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  summary,
  trends,
  insights
} = require("../controllers/analyticsController");

/* ================================
   ANALYTICS ROUTES
================================ */

router.get("/summary", auth, summary);
router.get("/trends", auth, trends);
router.get("/insights", auth, insights);

module.exports = router;
