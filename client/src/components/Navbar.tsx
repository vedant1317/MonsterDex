import { Link, useLocation } from "wouter";
import { Search, User, LogOut, Trophy, BookOpen } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar({ onAuthClick }: { onAuthClick: () => void }) {
  const [location, setLocation] = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [searchExpanded, setSearchExpanded] = useState(false);

  const navLinks = [
    { href: "/catalog", label: "Catalog", icon: BookOpen },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-card-border">
      <div className="max-w-[1920px] mx-auto px-20">
        <div className="flex items-center justify-between h-20">
          <Link href="/" data-testid="link-home">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-3xl font-display font-bold bg-gradient-to-r from-neon-green to-neon-lime bg-clip-text text-transparent tracking-wide">
                MONSTERDEX
              </div>
            </motion.div>
          </Link>

          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-${link.label.toLowerCase()}`}>
                <motion.div
                  className={`flex items-center gap-2 font-medium text-base cursor-pointer transition-colors ${
                    location === link.href
                      ? "text-neon-green"
                      : "text-foreground/80 hover:text-neon-green"
                  }`}
                  whileHover={{ y: -2 }}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.div
              className="relative"
              animate={{ width: searchExpanded ? 280 : 48 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`flex items-center bg-input border border-border rounded-lg overflow-hidden transition-all ${
                  searchExpanded ? "px-4" : "px-0"
                }`}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchExpanded(!searchExpanded)}
                  className="shrink-0"
                  data-testid="button-search-toggle"
                >
                  <Search className="w-4 h-4" />
                </Button>
                {searchExpanded && (
                  <input
                    type="text"
                    placeholder="Search flavors..."
                    className="bg-transparent border-none outline-none text-sm w-full py-2"
                    autoFocus
                    data-testid="input-search"
                    onBlur={() => setTimeout(() => setSearchExpanded(false), 200)}
                  />
                )}
              </div>
            </motion.div>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild data-testid="button-profile-dropdown">
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full border-2 border-neon-green/50 hover:border-neon-green transition-colors"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-gradient-to-br from-neon-green to-neon-lime text-black font-bold">
                        {user?.username?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border-card-border">
                  <DropdownMenuItem asChild data-testid="link-profile">
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer" data-testid="button-logout">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={onAuthClick}
                className="bg-gradient-to-r from-neon-green to-neon-lime text-black font-semibold hover:shadow-[0_0_30px_rgba(0,255,136,0.6)] transition-all"
                data-testid="button-login"
              >
                Login / Sign Up
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
