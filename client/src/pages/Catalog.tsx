import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, Filter, Loader2 } from "lucide-react";
import FlavorCard from "@/components/FlavorCard";
import { Flavor } from "@shared/schema";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = ["All", "Original", "Ultra", "Java", "Rehab", "Reserve", "Specialty"];
const sortOptions = [
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviewed" },
  { value: "name", label: "Name (A-Z)" },
];

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  const { data: flavors = [], isLoading } = useQuery<Flavor[]>({
    queryKey: ["/api/flavors"],
    queryFn: async () => {
      const response = await api.get("flavors");
      return response.data;
    },
  });

  const filteredFlavors = flavors
    .filter((flavor) => {
      const matchesSearch = flavor.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || flavor.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.avgRating - a.avgRating;
      if (sortBy === "reviews") return b.totalReviews - a.totalReviews;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-[1920px] mx-auto px-20 py-12">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-green to-neon-lime bg-clip-text text-transparent">
              FLAVOR CATALOG
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore all {flavors.length} Monster Energy flavors
          </p>
        </motion.div>

        <div className="flex gap-8">
          <motion.aside
            className="w-80 shrink-0 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-card p-6 rounded-lg border border-card-border">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-neon-green" />
                <h3 className="font-display font-bold text-lg">Search</h3>
              </div>
              <Input
                type="text"
                placeholder="Search flavors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-input border-border focus:border-neon-green"
                data-testid="input-search-catalog"
              />
            </div>

            <div className="bg-card p-6 rounded-lg border border-card-border">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-neon-green" />
                <h3 className="font-display font-bold text-lg">Category</h3>
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`w-full justify-start ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-neon-green to-neon-lime text-black border-0"
                        : "border-border hover:border-neon-green"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                    data-testid={`button-category-${category.toLowerCase()}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-card-border">
              <h3 className="font-display font-bold text-lg mb-4">Sort By</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-input border-border" data-testid="select-sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-card-border">
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.aside>

          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-96">
                <Loader2 className="w-12 h-12 animate-spin text-neon-green" />
              </div>
            ) : filteredFlavors.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-2xl text-muted-foreground">No flavors found</p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-4 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {filteredFlavors.map((flavor, index) => (
                  <motion.div
                    key={flavor._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <FlavorCard flavor={flavor} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
