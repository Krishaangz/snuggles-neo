import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import FloatingSnugBot from "@/components/FloatingSnugBot";
import LoadingScreen from "@/components/LoadingScreen";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import SnugBot from "./pages/SnugBot";
import GrowthTracker from "./pages/GrowthTracker";
import SleepAnalyzer from "./pages/SleepAnalyzer";
import NutritionPlanner from "./pages/NutritionPlanner";
import ParentWellness from "./pages/ParentWellness";
import ExpertContent from "./pages/ExpertContent";
import EmergencyGuide from "./pages/EmergencyGuide";
import SmartInsights from "./pages/SmartInsights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showInitialLoading, setShowInitialLoading] = useState(true);

  useEffect(() => {
    // Check if user has seen the initial loading screen
    const hasSeenLoading = sessionStorage.getItem("hasSeenInitialLoading");
    if (hasSeenLoading) {
      setShowInitialLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("hasSeenInitialLoading", "true");
    setShowInitialLoading(false);
  };

  if (showInitialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} type="initial" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/snugbot" element={<SnugBot />} />
              <Route path="/growth-tracker" element={<GrowthTracker />} />
              <Route path="/sleep-analyzer" element={<SleepAnalyzer />} />
              <Route path="/nutrition-planner" element={<NutritionPlanner />} />
              <Route path="/parent-wellness" element={<ParentWellness />} />
              <Route path="/expert-content" element={<ExpertContent />} />
              <Route path="/emergency-guide" element={<EmergencyGuide />} />
              <Route path="/smart-insights" element={<SmartInsights />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingSnugBot />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
