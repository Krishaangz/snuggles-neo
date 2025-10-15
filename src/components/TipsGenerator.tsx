import { useState, useEffect } from "react";
import { X, Baby, Heart, Moon, Sun, Star, Coffee, BookOpen, Clock, Smile } from "lucide-react";

const parentingTips = [
  "Babies thrive on routine - consistent sleep and feeding times help regulate their body clock.",
  "Tummy time is essential for motor development - aim for several short sessions throughout the day.",
  "Trust your instincts - you know your baby better than anyone else.",
  "Self-care isn't selfish - taking care of yourself helps you care better for your baby.",
  "Every baby develops at their own pace - avoid comparing milestones with other children.",
  "Skin-to-skin contact promotes bonding and helps regulate baby's temperature and heart rate.",
  "White noise can help soothe babies by mimicking sounds from the womb.",
  "Baby's first smile usually appears around 6-8 weeks - it's worth the wait!",
  "Reading to your baby from day one helps with language development.",
  "A calm parent often means a calm baby - take deep breaths when stressed.",
  "Swaddling can help newborns feel secure and sleep better.",
  "Burping after feeds helps prevent gas discomfort.",
  "Follow your baby's hunger cues rather than a strict schedule.",
  "Short, frequent naps are normal for newborns - sleep patterns improve with time.",
  "Your baby's cry is their way of communicating - you'll learn to distinguish different cries.",
  "Gentle massage can help with digestion and bonding.",
  "Keep a simple log of feeds and diapers in the early weeks to track patterns.",
  "Dim lights in the evening help signal bedtime to your baby.",
  "It's okay to ask for help - parenting is a team effort.",
  "Celebrate small victories - every good day is an achievement.",
];

interface TipsGeneratorProps {
  onClose: () => void;
}

const TipsGenerator = ({ onClose }: TipsGeneratorProps) => {
  const [currentTip, setCurrentTip] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const floatingIcons = [Baby, Heart, Moon, Sun, Star, Coffee, BookOpen, Clock, Smile, Star];

  useEffect(() => {
    // Get random tip
    const randomIndex = Math.floor(Math.random() * parentingTips.length);
    setCurrentTip(parentingTips[randomIndex]);
    
    // Fade in animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Centered Popup */}
      <div 
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-md w-[90%] transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Floating Icons */}
        {floatingIcons.map((Icon, index) => {
          const angle = (index / floatingIcons.length) * 2 * Math.PI;
          const radius = 150;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 pointer-events-none"
              style={{
                animation: `floatAround ${8 + index}s infinite ease-in-out`,
                animationDelay: `${index * 0.5}s`,
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <Icon className="w-6 h-6 text-primary" />
            </div>
          );
        })}
        
        {/* Card */}
        <div className="relative bg-gradient-to-br from-card via-card/95 to-card border-2 border-primary/20 p-8 rounded-2xl shadow-float">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-muted transition-colors"
            aria-label="Close tip"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-primary animate-pulse" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Parenting Tip
              </h3>
            </div>
            <p className="text-foreground/90 leading-relaxed">
              {currentTip}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TipsGenerator;