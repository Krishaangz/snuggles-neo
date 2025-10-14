import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  LineChart, 
  Moon, 
  UtensilsCrossed, 
  Heart, 
  BookOpen,
  AlertCircle,
  Sparkles,
  LogOut,
  Settings as SettingsIcon,
  Star
} from "lucide-react";
import { authStore } from "@/stores/authStore";
import { toast } from "sonner";
import QuoteOfTheDay from "@/components/QuoteOfTheDay";
import TipsGenerator from "@/components/TipsGenerator";

const features = [
  {
    icon: Bot,
    title: "SnugBot AI Assistant",
    description: "Chat with our AI companion",
    path: "/snugbot",
    color: "primary",
  },
  {
    icon: LineChart,
    title: "Growth Tracker",
    description: "Track your baby's growth",
    path: "/growth-tracker",
    color: "secondary",
  },
  {
    icon: Moon,
    title: "Sleep & Cry Analyzer",
    description: "Analyze sleep patterns",
    path: "/sleep-analyzer",
    color: "accent",
  },
  {
    icon: UtensilsCrossed,
    title: "Nutrition Planner",
    description: "Plan healthy meals",
    path: "/nutrition-planner",
    color: "sky",
  },
  {
    icon: Heart,
    title: "Parent Wellness",
    description: "Take care of yourself",
    path: "/parent-wellness",
    color: "primary",
  },
  {
    icon: BookOpen,
    title: "Expert Content Hub",
    description: "Learn from experts",
    path: "/expert-content",
    color: "secondary",
  },
  {
    icon: AlertCircle,
    title: "Emergency Guide",
    description: "Quick emergency help",
    path: "/emergency-guide",
    color: "accent",
  },
  {
    icon: Sparkles,
    title: "Smart Insights",
    description: "Personalized insights",
    path: "/smart-insights",
    color: "sky",
  },
];

const colorMap = {
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-secondary/10 text-secondary border-secondary/20",
  accent: "bg-accent/10 text-accent border-accent/20",
  sky: "bg-sky/10 text-sky border-sky/20",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const state = authStore.getState();
    if (!state.isAuthenticated) {
      navigate("/auth");
    } else {
      setUserName(state.user?.name || "");
    }

    const unsubscribe = authStore.subscribe(() => {
      const newState = authStore.getState();
      if (!newState.isAuthenticated) {
        navigate("/auth");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleLogout = () => {
    authStore.logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">{userName}</span>!
            </h1>
            <p className="text-muted-foreground">Choose a feature to get started</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowTip(true)} 
              variant="outline" 
              size="icon"
              title="Get a parenting tip"
            >
              <Star className="w-5 h-5" />
            </Button>
            <Button onClick={() => navigate("/settings")} variant="outline" size="icon">
              <SettingsIcon className="w-5 h-5" />
            </Button>
            <Button onClick={handleLogout} variant="outline" size="icon">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                onClick={() => navigate(feature.path)}
                className="p-6 gradient-card shadow-soft hover:shadow-medium transition-all group cursor-pointer border-2 hover:border-primary/30 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl ${colorMap[feature.color as keyof typeof colorMap]} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 border`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
        
        <QuoteOfTheDay />
      </div>

      {showTip && <TipsGenerator onClose={() => setShowTip(false)} />}
    </div>
  );
};

export default Dashboard;
