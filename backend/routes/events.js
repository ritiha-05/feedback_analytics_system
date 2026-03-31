const router = require("express").Router();
const { trackEvent } = require("../controllers/eventController");

router.post("/", trackEvent);

module.exports = router;
