import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ChatPreview } from "@/components/ChatPreview";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import FloatingSnugBot from "@/components/FloatingSnugBot";
import snugMascot from "@/assets/snug-mascot.png";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Floating mascots */}
      <img 
        src={snugMascot} 
        alt="" 
        className="fixed top-20 right-10 w-24 h-24 object-contain opacity-20 animate-bounce-gentle pointer-events-none z-10"
      />
      <img 
        src={snugMascot} 
        alt="" 
        className="fixed bottom-32 left-10 w-20 h-20 object-contain opacity-15 float-animation pointer-events-none z-10"
      />
      
      <div className="animate-fade-in-up">
        <Hero />
      </div>
      <div className="animate-fade-in-up stagger-1">
        <Features />
      </div>
      <div className="animate-fade-in-up stagger-2">
        <ChatPreview />
      </div>
      <div className="animate-fade-in-up stagger-3">
        <About />
      </div>
      <div className="animate-fade-in-up stagger-4">
        <Footer />
      </div>
      
      <FloatingSnugBot />
    </div>
  );
};

export default Index;
