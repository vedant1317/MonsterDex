import { motion } from "framer-motion";
import { Trophy, Star, Zap, Award, Crown, Target, Sparkles, Flame, Heart, CheckCircle } from "lucide-react";

interface AchievementBadgeProps {
  achievement: string;
  unlocked: boolean;
}

const achievementConfig: Record<string, { icon: any; description: string; color: string }> = {
  "First Sip": { icon: Sparkles, description: "Try your first flavor", color: "#00ff88" },
  "Beast Mode": { icon: Flame, description: "Try 5 different flavors", color: "#ff6b00" },
  "Ultra Collector": { icon: Crown, description: "Try 20 different flavors", color: "#FFD700" },
  "Monster Master": { icon: Trophy, description: "Try all 50+ flavors", color: "#00ff88" },
  "Review Rookie": { icon: Star, description: "Submit your first review", color: "#00ff88" },
  "Review King": { icon: Award, description: "Submit 50 reviews", color: "#FFD700" },
  "Energy Expert": { icon: Zap, description: "Submit 100 reviews", color: "#00ff88" },
  "Taste Tester": { icon: Heart, description: "Rate 10 flavors 5 stars", color: "#ff1493" },
  "Critic": { icon: Target, description: "Write 25 detailed reviews", color: "#00a5ff" },
  "Community Champion": { icon: CheckCircle, description: "Be a top contributor", color: "#39ff14" },
};

export default function AchievementBadge({ achievement, unlocked }: AchievementBadgeProps) {
  const config = achievementConfig[achievement] || {
    icon: Trophy,
    description: achievement,
    color: "#00ff88",
  };

  const Icon = config.icon;

  return (
    <motion.div
      className={`relative group rounded-lg overflow-hidden border-2 p-6 ${
        unlocked
          ? "bg-card border-card-border cursor-pointer"
          : "bg-card/30 border-border/30"
      }`}
      whileHover={unlocked ? { scale: 1.05, borderColor: config.color } : {}}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      data-testid={`achievement-${achievement.toLowerCase().replace(/\s/g, "-")}`}
    >
      {unlocked && (
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(circle at center, ${config.color} 0%, transparent 70%)`,
          }}
        />
      )}

      <div className="relative flex flex-col items-center text-center space-y-3">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center ${
            unlocked
              ? "bg-gradient-to-br from-neon-green to-neon-lime"
              : "bg-muted/50"
          }`}
          style={unlocked ? { boxShadow: `0 0 20px ${config.color}50` } : {}}
        >
          <Icon
            className={`w-8 h-8 ${
              unlocked ? "text-black" : "text-muted-foreground/50"
            }`}
          />
        </div>

        <div>
          <h4
            className={`font-display font-bold text-sm ${
              unlocked ? "text-foreground" : "text-muted-foreground/50"
            }`}
          >
            {achievement}
          </h4>
          <p
            className={`text-xs mt-1 ${
              unlocked ? "text-muted-foreground" : "text-muted-foreground/30"
            }`}
          >
            {config.description}
          </p>
        </div>

        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
            <span className="text-xs font-bold text-white/70">LOCKED</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
