import type { Express } from "express";
import { createServer, type Server } from "http";
import mongoose from "mongoose";
import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const authRoutes = require("./routes/auth.cjs");
const flavorRoutes = require("./routes/flavors.cjs");
const reviewRoutes = require("./routes/reviews.cjs");
const userRoutes = require("./routes/users.cjs");
const leaderboardRoutes = require("./routes/leaderboard.cjs");

export async function registerRoutes(app: Express): Promise<Server> {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/monsterdex");
    console.log("✓ Connected to MongoDB successfully");
  } catch (error) {
    console.error("✗ MongoDB connection error:", error);
  }

  app.use("/api/auth", authRoutes);
  app.use("/api/flavors", flavorRoutes);
  app.use("/api/reviews", reviewRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/leaderboard", leaderboardRoutes);

  const httpServer = createServer(app);
  return httpServer;
}
