const express = require("express");
const Flavor = require("../models/Flavor.cjs");
const auth = require("../middleware/auth.cjs");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const flavors = await Flavor.find(query).sort({ name: 1 });
    res.json(flavors);
  } catch (error) {
    console.error("Error fetching flavors:", error);
    res.status(500).json({ message: "Error fetching flavors" });
  }
});

router.get("/tried", auth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const User = require("../models/User.cjs");
    const user = await User.findById(req.user._id).populate("triedFlavors");
    res.json(user.triedFlavors || []);
  } catch (error) {
    console.error("Error fetching tried flavors:", error);
    res.status(500).json({ message: "Error fetching tried flavors" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const flavor = await Flavor.findById(req.params.id);
    if (!flavor) {
      return res.status(404).json({ message: "Flavor not found" });
    }
    res.json(flavor);
  } catch (error) {
    console.error("Error fetching flavor:", error);
    res.status(500).json({ message: "Error fetching flavor" });
  }
});

module.exports = router;
