import { useEffect, useState } from "react";
import snugMascot from "@/assets/snug-mascot.png";

interface LoadingScreenProps {
  onComplete: () => void;
  type?: "initial" | "auth";
}

const LoadingScreen = ({ onComplete, type = "initial" }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = type === "initial" ? 2000 : 1500;
    const steps = 100;
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [onComplete, type]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-background via-primary/5 to-accent/5 flex items-center justify-center">
      <div className="text-center space-y-8 animate-fade-in">
        {/* Mascot with pulse animation */}
        <div className="relative">
          <div className="absolute inset-0 animate-pulse-ring rounded-full" />
          <img
            src={snugMascot}
            alt="Snuggles loading"
            className="w-32 h-32 mx-auto animate-bounce-gentle"
          />
        </div>

        {/* Loading text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {type === "initial" ? "Welcome to Snuggles" : "Getting Ready"}
            </span>
          </h2>
          <p className="text-muted-foreground">
            {type === "initial" 
              ? "Your AI-powered parenting companion" 
              : "Preparing your personalized experience"}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto space-y-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">{progress}%</p>
        </div>

        {/* Fun facts during loading */}
        <div className="max-w-md mx-auto">
          <p className="text-sm text-muted-foreground italic">
            {type === "initial"
              ? "Did you know? Babies can recognize their mother's voice from birth!"
              : "Setting up your dashboard..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
