import { useState, useEffect, useRef } from "react";
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
  Settings,
  Star,
  Zap,
  Smile,
  Coffee,
  Cloud,
  Sun,
  Music,
  Camera,
  Gift,
  Target,
  Rocket,
  Trophy,
  Crown,
  Flame
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

const blastIcons = [Zap, Smile, Coffee, Cloud, Sun, Music, Camera, Gift, Target, Rocket, Trophy, Crown, Flame, Star, Heart, Sparkles];

const colorMap = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
  sky: "hsl(var(--sky))",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [showTip, setShowTip] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [particles, setParticles] = useState([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

  const createParticleBlast = () => {
    const newParticles = [];
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const distance = 100 + Math.random() * 50;
      const IconComponent = blastIcons[Math.floor(Math.random() * blastIcons.length)];
      
      newParticles.push({
        id: Date.now() + i,
        Icon: IconComponent,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotation: Math.random() * 360,
        delay: i * 0.03,
      });
    }
    setParticles(newParticles);
    
    setTimeout(() => setParticles([]), 1000);
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
    createParticleBlast();
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
    createParticleBlast();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextCard();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevCard();
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      nextCard();
    } else {
      prevCard();
    }
  };

  const handleCardClick = (path) => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate(path);
    }, 400);
  };

  const handleLogout = () => {
    authStore.logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getCardStyle = (index) => {
    const diff = index - currentIndex;
    const totalCards = features.length;
    
    let normalizedDiff = diff;
    if (Math.abs(diff) > totalCards / 2) {
      normalizedDiff = diff > 0 ? diff - totalCards : diff + totalCards;
    }
    
    const angle = (normalizedDiff * 40);
    const scale = 1 - Math.abs(normalizedDiff) * 0.15;
    const opacity = 1 - Math.abs(normalizedDiff) * 0.3;
    const zIndex = 100 - Math.abs(normalizedDiff);
    const translateZ = -Math.abs(normalizedDiff) * 100;
    const translateX = normalizedDiff * 5;
    
    return {
      transform: `rotateY(${angle}deg) scale(${scale}) translateZ(${translateZ}px) translateX(${translateX}%)`,
      opacity: Math.max(opacity, 0.3),
      zIndex,
      pointerEvents: normalizedDiff === 0 ? 'auto' : 'none',
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Navigation overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] animate-fade-in flex items-center justify-center">
          <div className="animate-spin-slow">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
        </div>
      )}

      {/* Continuous floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '6s' }} />
        <div className="absolute top-40 right-20 w-3 h-3 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '1s', animationDuration: '7s' }} />
        <div className="absolute top-60 left-1/4 w-5 h-5 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute bottom-40 right-1/3 w-4 h-4 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '3s', animationDuration: '6.5s' }} />
        <div className="absolute bottom-20 left-1/2 w-3 h-3 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '4s', animationDuration: '7.5s' }} />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Animated Header */}
        <div className="backdrop-blur-xl bg-background/40 rounded-3xl border border-primary/10 p-6 mb-8 shadow-xl animate-slide-down">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
                <span className="inline-block animate-wave">👋</span>{" "}
                <span className="inline-block">Welcome back,</span>{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent inline-block animate-gradient">
                  {userName}
                </span>
              </h1>
              <p className="text-muted-foreground text-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                Swipe or scroll through your features
              </p>
            </div>
            <div className="flex gap-3 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Button 
                onClick={() => setShowTip(true)} 
                variant="outline" 
                size="icon"
                className="relative overflow-hidden group animate-bounce-subtle"
              >
                <Star className="w-5 h-5 relative z-10 animate-spin-slow" />
              </Button>
              <Button 
                onClick={() => navigate("/settings")} 
                variant="outline" 
                size="icon"
                className="animate-bounce-subtle"
                style={{ animationDelay: '0.2s' }}
              >
                <Settings className="w-5 h-5 animate-spin-slow" style={{ animationDelay: '1s' }} />
              </Button>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                size="icon"
                className="animate-bounce-subtle"
                style={{ animationDelay: '0.4s' }}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* 3D Carousel Container - CENTERED */}
        <div className="flex items-center justify-center mb-12">
          <div 
            ref={containerRef}
            className="relative w-full max-w-6xl h-[500px] perspective-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
          >
            {/* Particle Blast Effect */}
            {particles.map((particle) => {
              const ParticleIcon = particle.Icon;
              return (
                <div
                  key={particle.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    animation: 'particle-blast 0.8s ease-out forwards',
                    animationDelay: `${particle.delay}s`,
                    '--tx': `${particle.x}px`,
                    '--ty': `${particle.y}px`,
                    '--rotation': `${particle.rotation}deg`,
                  }}
                >
                  <ParticleIcon className="w-6 h-6 text-primary/60" />
                </div>
              );
            })}

            {/* 3D Card Carousel */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center preserve-3d">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  const style = getCardStyle(index);
                  const isActive = index === currentIndex;
                  
                  return (
                    <Card
                      key={index}
                      onClick={() => isActive && handleCardClick(feature.path)}
                      className="absolute w-80 p-8 cursor-pointer border-2 overflow-hidden transition-all duration-700 ease-out backdrop-blur-xl hover:scale-105 active:scale-95"
                      style={{
                        ...style,
                        background: isActive 
                          ? 'linear-gradient(135deg, rgba(var(--background), 0.95) 0%, rgba(var(--muted), 0.7) 100%)'
                          : 'rgba(var(--background), 0.6)',
                        borderColor: isActive ? colorMap[feature.color] : 'rgba(var(--border), 0.3)',
                        boxShadow: isActive 
                          ? `0 20px 60px -12px ${colorMap[feature.color]}40`
                          : '0 10px 30px -12px rgba(0,0,0,0.2)',
                      }}
                    >
                      {/* Animated gradient border for active card */}
                      {isActive && (
                        <div 
                          className="absolute inset-0 opacity-50"
                          style={{
                            background: `linear-gradient(45deg, ${colorMap[feature.color]}, transparent, ${colorMap[feature.color]})`,
                            backgroundSize: '300% 300%',
                            animation: 'gradient-shift 3s ease infinite',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                            padding: '2px',
                          }}
                        />
                      )}

                      {/* Pulsing glow effect for active card */}
                      {isActive && (
                        <div 
                          className="absolute inset-0 blur-2xl opacity-20 animate-pulse"
                          style={{
                            background: `radial-gradient(circle, ${colorMap[feature.color]} 0%, transparent 70%)`,
                          }}
                        />
                      )}

                      {/* Icon with continuous animation */}
                      <div className="relative mb-6 flex justify-center">
                        <div 
                          className="w-20 h-20 rounded-full flex items-center justify-center border-2 relative"
                          style={{
                            background: `linear-gradient(135deg, ${colorMap[feature.color]}20, ${colorMap[feature.color]}10)`,
                            borderColor: colorMap[feature.color],
                            animation: isActive ? 'icon-pulse 2s ease-in-out infinite' : 'none',
                          }}
                        >
                          <Icon 
                            className="w-10 h-10"
                            style={{ 
                              color: colorMap[feature.color],
                              animation: isActive ? 'icon-rotate 4s linear infinite' : 'none',
                            }}
                          />
                          
                          {/* Rotating ring around icon */}
                          {isActive && (
                            <div 
                              className="absolute inset-0 rounded-full border-2 border-dashed animate-spin-slow"
                              style={{ borderColor: colorMap[feature.color] }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 text-center">
                        <h3 
                          className="text-2xl font-bold mb-3 transition-all duration-300"
                          style={{
                            background: isActive ? `linear-gradient(to right, ${colorMap[feature.color]}, ${colorMap.accent})` : 'inherit',
                            WebkitBackgroundClip: isActive ? 'text' : 'inherit',
                            WebkitTextFillColor: isActive ? 'transparent' : 'inherit',
                          }}
                        >
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      {/* Corner sparkles for active card */}
                      {isActive && (
                        <>
                          <div className="absolute top-4 right-4 animate-ping">
                            <Sparkles className="w-4 h-4" style={{ color: colorMap[feature.color] }} />
                          </div>
                          <div className="absolute bottom-4 left-4 animate-ping" style={{ animationDelay: '0.5s' }}>
                            <Sparkles className="w-4 h-4" style={{ color: colorMap[feature.color] }} />
                          </div>
                        </>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    createParticleBlast();
                  }}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: index === currentIndex ? colorMap[features[currentIndex].color] : 'rgba(var(--muted-foreground), 0.3)',
                    transform: index === currentIndex ? 'scale(1.5)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <Button
            onClick={prevCard}
            variant="outline"
            size="lg"
            className="rounded-full animate-bounce-subtle"
          >
            ← Previous
          </Button>
          <Button
            onClick={nextCard}
            variant="outline"
            size="lg"
            className="rounded-full animate-bounce-subtle"
            style={{ animationDelay: '0.2s' }}
          >
            Next →
          </Button>
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
          <QuoteOfTheDay />
        </div>
      </div>

      {showTip && <TipsGenerator onClose={() => setShowTip(false)} />}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(-10px) translateX(-10px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(14deg); }
          20%, 40% { transform: rotate(-8deg); }
          50% { transform: rotate(0deg); }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes icon-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes icon-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes particle-blast {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0) rotate(var(--rotation));
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-wave {
          display: inline-block;
          animation: wave 2s ease-in-out infinite;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }

        .perspective-container {
          perspective: 2000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
