import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Flavor } from "@shared/schema";
import { Link } from "wouter";

interface FlavorCardProps {
  flavor: Flavor;
}

export default function FlavorCard({ flavor }: FlavorCardProps) {
  return (
    <Link href={`/flavor/${flavor._id}`}>
      <motion.div
        className="group relative bg-card rounded-lg overflow-hidden border-2 border-card-border cursor-pointer"
        whileHover={{
          scale: 1.05,
          borderColor: "#00ff88",
          boxShadow: "0 0 30px rgba(0,255,136,0.4)",
        }}
        transition={{ duration: 0.2 }}
        data-testid={`card-flavor-${flavor._id}`}
      >
        <div className="aspect-[3/4] relative overflow-hidden bg-background/50">
          <img
            src={flavor.imageUrl}
            alt={flavor.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-sm text-foreground/90 line-clamp-2">{flavor.description}</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-display font-bold text-lg line-clamp-1 group-hover:text-neon-green transition-colors">
            {flavor.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(flavor.avgRating)
                      ? "fill-neon-green text-neon-green"
                      : "fill-none text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {flavor.totalReviews} {flavor.totalReviews === 1 ? "review" : "reviews"}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="px-2 py-1 bg-neon-green/10 text-neon-green rounded border border-neon-green/30 font-medium">
              {flavor.category}
            </span>
            <span className="font-bold text-neon-green">
              {flavor.avgRating > 0 ? flavor.avgRating.toFixed(1) : "N/A"}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
