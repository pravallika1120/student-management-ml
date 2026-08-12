const express = require("express");

const {
  predictPerformance,
  getPredictionHistory
} = require("../controllers/predictionController");

const router = express.Router();

router.post("/", predictPerformance);

router.get("/history", getPredictionHistory);

module.exports = router;