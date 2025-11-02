import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Trophy, Star, Zap, Loader2 } from "lucide-react";
import { User, Flavor } from "@shared/schema";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import AchievementBadge from "@/components/AchievementBadge";
import FlavorCard from "@/components/FlavorCard";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const allAchievements = [
  "First Sip",
  "Beast Mode",
  "Ultra Collector",
  "Monster Master",
  "Review Rookie",
  "Review King",
  "Energy Expert",
  "Taste Tester",
  "Critic",
  "Community Champion",
];

export default function Profile() {
  const { user: authUser } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);
  const [previousAchievements, setPreviousAchievements] = useState<string[]>([]);

  const { data: profile } = useQuery<User>({
    queryKey: ["/api/users/profile"],
    queryFn: async () => {
      const response = await api.get("users/profile");
      return response.data;
    },
    enabled: !!authUser,
  });

  const { data: triedFlavors = [] } = useQuery<Flavor[]>({
    queryKey: ["/api/flavors/tried"],
    queryFn: async () => {
      const response = await api.get("flavors/tried");
      return response.data;
    },
    enabled: !!profile,
  });

  useEffect(() => {
    if (profile && previousAchievements.length > 0) {
      const newAchievements = profile.achievements.filter(
        (ach) => !previousAchievements.includes(ach)
      );
      if (newAchievements.length > 0) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
    if (profile) {
      setPreviousAchievements(profile.achievements);
    }
  }, [profile?.achievements]);

  if (!authUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <p className="text-xl text-muted-foreground">Please login to view your profile</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <Loader2 className="w-12 h-12 animate-spin text-neon-green" />
      </div>
    );
  }

  const categoryData = triedFlavors.reduce((acc: Record<string, number>, flavor) => {
    acc[flavor.category] = (acc[flavor.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  const ratingDistribution = [1, 2, 3, 4, 5].map((rating) => ({
    rating: `${rating}★`,
    count: 0,
  }));

  const COLORS = ["#00ff88", "#39ff14", "#00d4ff", "#ff00ff", "#ffaa00", "#ff0055"];

  return (
    <div className="min-h-screen bg-background pt-20">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

      <div className="max-w-[1920px] mx-auto px-20 py-12">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-green to-neon-lime bg-clip-text text-transparent">
              YOUR PROFILE
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">Track your Monster journey</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-card p-8 rounded-lg border-2 border-neon-green/30">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-green to-neon-lime flex items-center justify-center">
                <Zap className="w-8 h-8 text-black" />
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-neon-green">
                  {profile.stats.totalTried}
                </div>
                <div className="text-muted-foreground">Flavors Tried</div>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg border-2 border-card-border">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                <Star className="w-8 h-8 text-accent-foreground" />
              </div>
              <div>
                <div className="text-4xl font-display font-bold">{profile.stats.totalReviews}</div>
                <div className="text-muted-foreground">Reviews Written</div>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg border-2 border-card-border">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                <Trophy className="w-8 h-8 text-accent-foreground" />
              </div>
              <div>
                <div className="text-4xl font-display font-bold">
                  {profile.stats.avgRating > 0 ? profile.stats.avgRating.toFixed(1) : "N/A"}
                </div>
                <div className="text-muted-foreground">Avg Rating Given</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-8">
          <motion.div
            className="col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">Achievements</h2>
              <div className="grid grid-cols-5 gap-4">
                {allAchievements.map((achievement) => (
                  <AchievementBadge
                    key={achievement}
                    achievement={achievement}
                    unlocked={profile.achievements.includes(achievement)}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold mb-6">
                Tried Flavors ({triedFlavors.length})
              </h2>
              {triedFlavors.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-lg border border-card-border">
                  <p className="text-muted-foreground">
                    You haven't tried any flavors yet. Start exploring!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-6">
                  {triedFlavors.map((flavor) => (
                    <FlavorCard key={flavor._id} flavor={flavor} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-card p-6 rounded-lg border border-card-border">
              <h3 className="text-xl font-display font-bold mb-6">Category Breakdown</h3>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a2e",
                        border: "1px solid #00ff88",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-muted-foreground py-12">No data yet</p>
              )}
            </div>

            <div className="bg-card p-6 rounded-lg border border-card-border">
              <h3 className="text-xl font-display font-bold mb-6">Rating Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={ratingDistribution}>
                  <XAxis
                    dataKey="rating"
                    stroke="#888"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#888" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a2e",
                      border: "1px solid #00ff88",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="#00ff88" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
