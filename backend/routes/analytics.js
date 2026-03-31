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

router.get("/summary",  summary);
router.get("/trends", trends);
router.get("/insights",  insights);

module.exports = router;
