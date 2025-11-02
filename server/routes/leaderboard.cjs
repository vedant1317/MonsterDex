const express = require("express");
const Flavor = require("../models/Flavor.cjs");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const flavors = await Flavor.find({ totalReviews: { $gt: 0 } })
      .sort({ avgRating: -1, totalReviews: -1 })
      .limit(10);

    res.json(flavors);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
});

module.exports = router;
