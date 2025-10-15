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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with glassmorphism */}
        <div className="backdrop-blur-xl bg-background/40 rounded-3xl border border-primary/10 p-6 mb-12 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
                <span className="inline-block animate-fade-in">Welcome back,</span>{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent inline-block animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  {userName}
                </span>
                <span className="inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>!</span>
              </h1>
              <p className="text-muted-foreground text-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
                Choose a feature to get started on your parenting journey
              </p>
            </div>
            <div className="flex gap-3 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Button 
                onClick={() => setShowTip(true)} 
                variant="outline" 
                size="icon"
                title="Get a parenting tip"
                className="relative overflow-hidden group hover:scale-110 transition-transform"
              >
                <Star className="w-5 h-5 relative z-10 group-hover:rotate-180 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              <Button 
                onClick={() => navigate("/settings")} 
                variant="outline" 
                size="icon"
                className="hover:scale-110 transition-transform"
              >
                <SettingsIcon className="w-5 h-5 hover:rotate-90 transition-transform duration-300" />
              </Button>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                size="icon"
                className="hover:scale-110 transition-transform hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Hexagonal Grid Layout */}
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isHovered = hoveredIndex === index;
              
              return (
                <div
                  key={index}
                  className="relative animate-fade-in"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    transformStyle: 'preserve-3d',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Card
                    onClick={() => navigate(feature.path)}
                    className="relative p-6 cursor-pointer border-2 overflow-hidden group h-full transition-all duration-500 ease-out"
                    style={{
                      transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                      boxShadow: isHovered 
                        ? '0 20px 40px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(var(--primary), 0.2)' 
                        : '0 4px 6px -1px rgba(0,0,0,0.1)',
                      background: isHovered 
                        ? 'linear-gradient(135deg, rgba(var(--background), 0.95) 0%, rgba(var(--muted), 0.5) 100%)'
                        : 'rgba(var(--background), 0.8)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    {/* Animated gradient border effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(45deg, var(--primary), var(--accent), var(--secondary), var(--primary))',
                        backgroundSize: '300% 300%',
                        animation: isHovered ? 'gradient-shift 3s ease infinite' : 'none',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        padding: '2px',
                      }}
                    />

                    {/* Glowing orb effect on hover */}
                    {isHovered && (
                      <div 
                        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-30 blur-2xl transition-all duration-700"
                        style={{
                          background: `radial-gradient(circle, var(--${feature.color}) 0%, transparent 70%)`,
                        }}
                      />
                    )}

                    {/* Icon container with 3D effect */}
                    <div className="relative mb-6">
                      <div 
                        className={`w-16 h-16 rounded-2xl ${colorMap[feature.color as keyof typeof colorMap]} flex items-center justify-center border-2 transition-all duration-500 relative overflow-hidden`}
                        style={{
                          transform: isHovered ? 'rotateY(15deg) rotateX(-5deg) scale(1.1)' : 'rotateY(0deg) rotateX(0deg) scale(1)',
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        {/* Shimmer effect */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                            backgroundSize: '200% 200%',
                            animation: isHovered ? 'shimmer 2s infinite' : 'none',
                          }}
                        />
                        <Icon 
                          className="w-8 h-8 relative z-10 transition-transform duration-500" 
                          style={{
                            transform: isHovered ? 'scale(1.2) rotate(5deg)' : 'scale(1) rotate(0deg)',
                          }}
                        />
                      </div>
                      
                      {/* Floating particles */}
                      {isHovered && (
                        <>
                          <div 
                            className="absolute top-0 left-0 w-2 h-2 rounded-full bg-primary/60 animate-ping"
                            style={{ animationDuration: '2s' }}
                          />
                          <div 
                            className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-accent/60 animate-ping"
                            style={{ animationDuration: '2.5s', animationDelay: '0.3s' }}
                          />
                          <div 
                            className="absolute bottom-2 left-4 w-1 h-1 rounded-full bg-secondary/60 animate-ping"
                            style={{ animationDuration: '2.2s', animationDelay: '0.6s' }}
                          />
                        </>
                      )}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-2 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent">
                        {feature.title}
                      </h3>
                      <p 
                        className="text-muted-foreground text-sm leading-relaxed transition-all duration-300"
                        style={{
                          opacity: isHovered ? 1 : 0.8,
                        }}
                      >
                        {feature.description}
                      </p>
                    </div>

                    {/* Corner accent */}
                    <div 
                      className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at top right, var(--${feature.color}) 0%, transparent 70%)`,
                      }}
                    />
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-12 animate-fade-in" style={{ animationDelay: '1s' }}>
          <QuoteOfTheDay />
        </div>
      </div>

      {showTip && <TipsGenerator onClose={() => setShowTip(false)} />}

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% -200%; }
          100% { background-position: 200% 200%; }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
