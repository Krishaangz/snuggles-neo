import { useState, useEffect } from "react";
import { X } from "lucide-react";

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

  useEffect(() => {
    // Get random tip
    const randomIndex = Math.floor(Math.random() * parentingTips.length);
    setCurrentTip(parentingTips[randomIndex]);
    
    // Slide down animation
    setTimeout(() => setIsVisible(true), 100);
    
    // Auto-hide after 8 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 8000);
    
    return () => clearTimeout(hideTimer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div 
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="bg-gradient-to-r from-primary via-accent to-secondary p-8 rounded-2xl shadow-float border-2 border-primary/30">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
          aria-label="Close tip"
        >
          <X className="w-5 h-5 text-primary-foreground" />
        </button>
        
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-primary-foreground flex items-center gap-2">
            💡 Parenting Tip
          </h3>
          <p className="text-primary-foreground/90 leading-relaxed">
            {currentTip}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipsGenerator;