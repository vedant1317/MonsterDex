const express = require("express");
const Review = require("../models/Review.cjs");
const Flavor = require("../models/Flavor.cjs");
const User = require("../models/User.cjs");
const auth = require("../middleware/auth.cjs");

const router = express.Router();

router.get("/flavor/:id", async (req, res) => {
  try {
    const reviews = await Review.find({ flavorId: req.params.id })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    const reviewsWithUsername = reviews.map((review) => ({
      _id: review._id,
      userId: review.userId._id,
      flavorId: review.flavorId,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      username: review.userId.username,
    }));

    res.json(reviewsWithUsername);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { flavorId, rating, comment } = req.body;

    const existingReview = await Review.findOne({
      userId: req.userId,
      flavorId,
    });

    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this flavor" });
    }

    const review = new Review({
      userId: req.userId,
      flavorId,
      rating,
      comment,
    });

    await review.save();

    const allReviews = await Review.find({ flavorId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await Flavor.findByIdAndUpdate(flavorId, {
      avgRating: avgRating,
      totalReviews: allReviews.length,
    });

    const user = await User.findById(req.userId);
    const userReviews = await Review.find({ userId: req.userId });
    const userAvgRating = userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length;

    user.stats.totalReviews = userReviews.length;
    user.stats.avgRating = userAvgRating;

    if (!user.triedFlavors.includes(flavorId)) {
      user.triedFlavors.push(flavorId);
      user.stats.totalTried = user.triedFlavors.length;
    }

    const achievements = [];
    if (user.stats.totalReviews === 1 && !user.achievements.includes("Review Rookie")) {
      achievements.push("Review Rookie");
    }
    if (user.stats.totalReviews >= 50 && !user.achievements.includes("Review King")) {
      achievements.push("Review King");
    }
    if (user.stats.totalReviews >= 100 && !user.achievements.includes("Energy Expert")) {
      achievements.push("Energy Expert");
    }
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

    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Error creating review" });
  }
});

module.exports = router;
