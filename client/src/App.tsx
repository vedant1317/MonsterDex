import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Catalog from "./pages/Catalog";
import FlavorDetail from "./pages/FlavorDetail";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import AuthModal from "./components/AuthModal";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/flavor/:id" component={FlavorDetail} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/profile" component={Profile} />
      <Route component={Landing} />
    </Switch>
  );
}

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar onAuthClick={() => setAuthModalOpen(true)} />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Router />
            </motion.div>
          </AnimatePresence>
          <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1a1a2e",
                color: "#fff",
                border: "1px solid #00ff88",
                borderRadius: "8px",
              },
              success: {
                iconTheme: {
                  primary: "#00ff88",
                  secondary: "#1a1a2e",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ff0055",
                  secondary: "#1a1a2e",
                },
              },
            }}
          />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
