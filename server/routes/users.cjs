const express = require("express");
const User = require("../models/User.cjs");
const auth = require("../middleware/auth.cjs");

const router = express.Router();

router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
});

router.put("/profile", auth, async (req, res) => {
  try {
    const { addFlavorId } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (addFlavorId && !user.triedFlavors.includes(addFlavorId)) {
      user.triedFlavors.push(addFlavorId);
      user.stats.totalTried = user.triedFlavors.length;

      const achievements = [];
      if (user.stats.totalTried === 1 && !user.achievements.includes("First Sip")) {
        achievements.push("First Sip");
      }
      if (user.stats.totalTried >= 5 && !user.achievements.includes("Beast Mode")) {
        achievements.push("Beast Mode");
      }
      if (user.stats.totalTried >= 20 && !user.achievements.includes("Ultra Collector")) {
        achievements.push("Ultra Collector");
      }
      if (user.stats.totalTried >= 50 && !user.achievements.includes("Monster Master")) {
        achievements.push("Monster Master");
      }

      user.achievements.push(...achievements);
      await user.save();
    }

    res.json(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
});

module.exports = router;
