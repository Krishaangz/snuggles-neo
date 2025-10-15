import { Button } from "@/components/ui/button";
import { Sparkles, Baby, Heart, Moon, Sun, Star, Coffee, BookOpen, Clock, Smile } from "lucide-react";
import snugglesLogo from "@/assets/snuggles-logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import LoadingScreen from "@/components/LoadingScreen";

export const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Your Baby's Digital Wellness Companion";
  const [showExplosion, setShowExplosion] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, []);

  const handleGetStarted = () => {
    setShowExplosion(true);
    setTimeout(() => {
      setShowLoading(true);
    }, 800);
    setTimeout(() => {
      if (isAuthenticated) {
        navigate("/dashboard");
      } else {
        navigate("/auth");
      }
    }, 2000);
  };

  const explosionIcons = [Baby, Heart, Moon, Sun, Star, Coffee, BookOpen, Clock, Smile, Sparkles];

  if (showLoading) {
    return <LoadingScreen type="initial" onComplete={() => {}} />;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Icon Explosion Animation */}
      {showExplosion && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {explosionIcons.map((Icon, index) => {
            const angle = (index / explosionIcons.length) * 2 * Math.PI;
            const distance = 60;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  animation: `iconExplosion 0.8s ease-out forwards`,
                  animationDelay: `${index * 0.05}s`,
                  '--tx': `${x}vw`,
                  '--ty': `${y}vh`,
                } as any}
              >
                <Icon className="w-8 h-8 text-primary" />
              </div>
            );
          })}
        </div>
      )}
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl animate-pulse" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Logo with glow effect */}
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary blur-2xl opacity-50 rounded-full animate-pulse" />
            <img 
              src={snugglesLogo} 
              alt="Snuggles"
              className="w-32 h-32 relative z-10 animate-float"
            />
          </div>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-full border border-primary/20 shadow-soft animate-fade-in">
            <Sparkles className="w-5 h-5 text-primary animate-spin-slow" />
            <span className="text-sm font-medium bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              AI-Powered Wellness Companion
            </span>
          </div>
          
          {/* Animated title with typing effect */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              {displayedText}
            </span>
            <span className="animate-pulse">|</span>
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl animate-fade-in stagger-1">
            Personalized, expert-verified AI guidance for modern parents. Track growth, analyze sleep patterns, plan nutrition, and nurture your baby with trusted support.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in stagger-2">
            <Button 
              size="lg" 
              className="gap-2 shadow-medium hover:shadow-float transition-all hover:scale-105" 
              onClick={handleGetStarted}
            >
              <Sparkles className="w-5 h-5" />
              Get Started
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
};