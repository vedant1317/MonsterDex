import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Trophy, Star, Medal, Loader2 } from "lucide-react";
import { Flavor } from "@shared/schema";
import api from "@/lib/api";
import { Link } from "wouter";

export default function Leaderboard() {
  const { data: leaderboard = [], isLoading } = useQuery<Flavor[]>({
    queryKey: ["/api/leaderboard"],
    queryFn: async () => {
      const response = await api.get("leaderboard");
      return response.data;
    },
  });

  const podiumColors = [
    { bg: "from-yellow-400 to-yellow-600", text: "text-yellow-900", glow: "0 0 40px rgba(234, 179, 8, 0.6)" },
    { bg: "from-gray-300 to-gray-500", text: "text-gray-900", glow: "0 0 30px rgba(156, 163, 175, 0.5)" },
    { bg: "from-orange-400 to-orange-600", text: "text-orange-900", glow: "0 0 30px rgba(251, 146, 60, 0.5)" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <Loader2 className="w-12 h-12 animate-spin text-neon-green" />
      </div>
    );
  }

  const topThree = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-neon-green" />
            <h1 className="text-6xl font-display font-bold">
              <span className="bg-gradient-to-r from-neon-green to-neon-lime bg-clip-text text-transparent">
                LEADERBOARD
              </span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Top rated Monster Energy flavors by the community
          </p>
        </motion.div>

        {topThree.length > 0 && (
          <motion.div
            className="grid grid-cols-3 gap-8 mb-16 items-end"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {[topThree[1], topThree[0], topThree[2]].map((flavor, idx) => {
              if (!flavor) return null;
              const actualRank = idx === 1 ? 0 : idx === 0 ? 1 : 2;
              const podium = podiumColors[actualRank];
              const height = idx === 1 ? "h-96" : idx === 0 ? "h-80" : "h-72";

              return (
                <Link key={flavor._id} href={`/flavor/${flavor._id}`}>
                  <motion.div
                    className={`relative ${height} cursor-pointer`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: podium.glow,
                    }}
                    data-testid={`podium-${actualRank + 1}`}
                  >
                    <div className={`h-full bg-gradient-to-br ${podium.bg} rounded-lg p-6 flex flex-col items-center justify-between border-4 border-white/20`}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${podium.bg} flex items-center justify-center border-4 border-white/30 shadow-lg`}>
                          <span className={`text-3xl font-display font-bold ${podium.text}`}>
                            {actualRank + 1}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 flex items-center justify-center mt-8">
                        <img
                          src={flavor.imageUrl}
                          alt={flavor.name}
                          className="max-h-48 object-contain drop-shadow-2xl"
                        />
                      </div>

                      <div className="text-center space-y-2">
                        <h3 className={`font-display font-bold text-lg line-clamp-2 ${podium.text}`}>
                          {flavor.name}
                        </h3>
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-5 h-5 fill-white text-white" />
                          <span className={`text-2xl font-bold ${podium.text}`}>
                            {flavor.avgRating.toFixed(1)}
                          </span>
                        </div>
                        <p className={`text-sm ${podium.text} opacity-80`}>
                          {flavor.totalReviews} reviews
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        )}

        {remaining.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
              <Medal className="w-6 h-6 text-neon-green" />
              Top 10 Rankings
            </h2>
            {remaining.map((flavor, index) => (
              <Link key={flavor._id} href={`/flavor/${flavor._id}`}>
                <motion.div
                  className="bg-card p-6 rounded-lg border border-card-border hover:border-neon-green hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 10 }}
                  data-testid={`rank-${index + 4}`}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-green to-neon-lime flex items-center justify-center">
                      <span className="text-2xl font-display font-bold text-black">
                        {index + 4}
                      </span>
                    </div>

                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-background/50">
                      <img
                        src={flavor.imageUrl}
                        alt={flavor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-display font-bold text-xl mb-1">{flavor.name}</h3>
                      <p className="text-sm text-muted-foreground">{flavor.category}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-5 h-5 fill-neon-green text-neon-green" />
                          <span className="text-2xl font-bold text-neon-green">
                            {flavor.avgRating.toFixed(1)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {flavor.totalReviews} reviews
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}

        {leaderboard.length === 0 && !isLoading && (
          <div className="text-center py-24">
            <p className="text-2xl text-muted-foreground">No rankings available yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
