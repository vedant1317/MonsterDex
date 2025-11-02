const mongoose = require("mongoose");

const flavorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Original", "Ultra", "Java", "Rehab", "Reserve", "Specialty"],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flavor", flavorSchema);
