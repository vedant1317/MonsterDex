import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search, Zap, Trophy, Users, ArrowRight } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const categories = [
  { name: "Original", color: "#00a651", description: "The classics" },
  { name: "Ultra", color: "#ffffff", description: "Zero sugar energy" },
  { name: "Java", color: "#8b4513", description: "Coffee + Energy" },
  { name: "Rehab", color: "#ffa500", description: "Recovery blend" },
  { name: "Reserve", color: "#FFD700", description: "Premium editions" },
  { name: "Specialty", color: "#9370DB", description: "Unique flavors" },
];

const stats = [
  { value: "50+", label: "Flavors", icon: Zap },
  { value: "1000+", label: "Reviews", icon: Trophy },
  { value: "500+", label: "Users", icon: Users },
];

export default function Landing() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      <div className="relative z-10 pt-20">
        <section className="min-h-screen flex items-center justify-center px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-7xl font-display font-bold tracking-wide"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-neon-green via-neon-lime to-neon-green bg-clip-text text-transparent">
                DISCOVER
              </span>
              <br />
              <span className="text-foreground">THE ULTIMATE</span>
              <br />
              <span className="bg-gradient-to-r from-neon-green via-neon-lime to-neon-green bg-clip-text text-transparent">
                MONSTER EXPERIENCE
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Rate, review, and track every Monster Energy flavor. Join the community of energy drink enthusiasts.
            </motion.p>

            <motion.div
              className="flex gap-4 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for your favorite flavor..."
                  className="pl-12 h-14 bg-card/80 backdrop-blur-sm border-2 border-neon-green/30 focus:border-neon-green text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-hero-search"
                />
              </div>
              <Link href={`/catalog${searchQuery ? `?search=${searchQuery}` : ""}`}>
                <Button
                  size="lg"
                  className="h-14 px-8 bg-gradient-to-r from-neon-green to-neon-lime text-black font-bold text-lg hover:shadow-[0_0_40px_rgba(0,255,136,0.6)] transition-all"
                  data-testid="button-search"
                >
                  Explore
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-card-border hover:border-neon-green/50 transition-all"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,255,136,0.3)" }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-neon-green" />
                  <div className="text-4xl font-display font-bold text-neon-green">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-display font-bold mb-4">
                <span className="bg-gradient-to-r from-neon-green to-neon-lime bg-clip-text text-transparent">
                  BROWSE BY CATEGORY
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore our complete collection of Monster Energy flavors
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <Link key={category.name} href={`/catalog?category=${category.name}`}>
                  <motion.div
                    className="relative group cursor-pointer overflow-hidden rounded-lg bg-card border-2 border-card-border h-48"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.03,
                      borderColor: "#00ff88",
                      boxShadow: "0 0 30px rgba(0,255,136,0.4)",
                    }}
                    data-testid={`card-category-${category.name.toLowerCase()}`}
                  >
                    <div
                      className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                      style={{
                        background: `linear-gradient(135deg, ${category.color}40 0%, transparent 100%)`,
                      }}
                    />
                    <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                      <h3 className="text-3xl font-display font-bold mb-2 group-hover:text-neon-green transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-display font-bold mb-6">
                <span className="bg-gradient-to-r from-neon-green to-neon-lime bg-clip-text text-transparent">
                  READY TO START?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of Monster enthusiasts and share your flavor journey
              </p>
              <Link href="/catalog">
                <Button
                  size="lg"
                  className="h-16 px-12 bg-gradient-to-r from-neon-green to-neon-lime text-black font-bold text-xl hover:shadow-[0_0_50px_rgba(0,255,136,0.7)] transition-all"
                  data-testid="button-get-started"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
