import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ChatPreview } from "@/components/ChatPreview";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";


const Index = () => {
  return (
    <div className="min-h-screen relative">
      <div className="animate-fade-in-up">
        <Hero />
      </div>
      <div className="animate-fade-in-up stagger-1">
        <Features />
      </div>
      <div className="animate-fade-in-up stagger-2">
        <ChatPreview />
      </div>
      <div className="animate-fade-in-up stagger-3" id="features">
        <About />
      </div>
      <div className="animate-fade-in-up stagger-4">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
