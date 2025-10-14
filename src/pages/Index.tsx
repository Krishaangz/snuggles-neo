import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <div className="animate-fade-in-up">
        <Hero />
      </div>
      <div className="animate-fade-in-up stagger-1">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
