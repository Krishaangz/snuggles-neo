import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, Lightbulb, HelpCircle, MessageSquare, Flag, Bot, LineChart, Moon, UtensilsCrossed, Sparkles, BookOpen, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const Essentials = () => {
  const features = [
    {
      icon: Bot,
      title: "SnugBot AI Assistant",
      description: "Your 24/7 AI parenting companion. Ask questions, get personalized advice, and receive expert-verified guidance anytime you need it.",
    },
    {
      icon: LineChart,
      title: "Growth Tracker",
      description: "Monitor your baby's growth with WHO-standard percentile charts. Track weight, height, and head circumference with AI-powered insights.",
    },
    {
      icon: Moon,
      title: "Sleep & Cry Analyzer",
      description: "Understand your baby's sleep patterns and crying cues. Get personalized recommendations for better sleep routines.",
    },
    {
      icon: UtensilsCrossed,
      title: "Nutrition Planner",
      description: "Create age-appropriate meal plans with nutritional analysis. Track feeding schedules and get recipe suggestions.",
    },
    {
      icon: Heart,
      title: "Parent Wellness",
      description: "Take care of yourself while caring for your baby. Access self-care tips, mental health resources, and wellness tracking.",
    },
    {
      icon: BookOpen,
      title: "Expert Content Hub",
      description: "Browse verified articles, guides, and resources from pediatricians and child development experts.",
    },
    {
      icon: Sparkles,
      title: "Smart Insights",
      description: "Get AI-generated insights based on your baby's data patterns and developmental milestones.",
    },
    {
      icon: AlertCircle,
      title: "Emergency Guide",
      description: "Quick access to essential emergency information, first aid guides, and when to seek medical help.",
    },
  ];

  const faqs = [
    {
      question: "Is Snuggles free to use?",
      answer: "Snuggles offers a free tier with essential features like Sleep Analyzer and Emergency Guide. Premium plans unlock additional features like Growth Tracker, Nutrition Planner, and unlimited AI assistance.",
    },
    {
      question: "How accurate is the AI advice?",
      answer: "All AI responses are verified against guidelines from WHO, UNICEF, NHS, CDC, and AAP. However, AI advice should complement, not replace, professional medical guidance.",
    },
    {
      question: "Can I use Snuggles offline?",
      answer: "Some features work offline, but AI-powered tools require an internet connection. Your data is stored locally and synced when you're back online.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes! We use industry-standard encryption and never share your personal data with third parties. All information is stored securely on your device.",
    },
    {
      question: "What age range does Snuggles cover?",
      answer: "Snuggles is designed for parents of babies from birth to 24 months, with features tailored to each developmental stage.",
    },
    {
      question: "Can I export my baby's data?",
      answer: "Premium users can export all tracked data in CSV format for sharing with healthcare providers or personal records.",
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel anytime from the Settings page. Your premium features will remain active until the end of your billing period.",
    },
    {
      question: "Do you offer family sharing?",
      answer: "Yes! Premium plans allow up to 3 family members to access the same baby's data and receive updates.",
    },
  ];

  const handleContactSupport = () => {
    toast.success("Support form opened! Our team typically responds within 24 hours.");
  };

  const handleReportIssue = (type: string) => {
    toast.success(`${type} report submitted. Thank you for helping us improve!`);
  };

  return (
    <div className="space-y-8 py-6">
      {/* About Us */}
      <Card className="p-6 gradient-card shadow-soft border-2">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Heart className="w-6 h-6 text-primary" />
          About Snuggles
        </h3>
        <div className="space-y-4 text-muted-foreground">
          <p className="leading-relaxed">
            <span className="font-semibold text-foreground">Our Story:</span> Snuggles was born from a simple truth — parenting can be overwhelming, even when it's beautiful. We wanted to create something that doesn't just give answers, but understands emotions.
          </p>
          <p className="leading-relaxed">
            <span className="font-semibold text-foreground">Our Vision:</span> To make Snuggles the world's most trusted AI-driven baby wellness companion, where every insight is safe, every suggestion is kind, and every moment feels supported.
          </p>
          <p className="leading-relaxed">
            <span className="font-semibold text-foreground">Our Mission:</span> To empower parents worldwide with personalized, expert-approved, and emotionally intelligent babycare, uniting verified science with heartfelt design.
          </p>
        </div>
      </Card>

      {/* Features */}
      <Card className="p-6 gradient-card shadow-soft border-2">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-accent" />
          What We Offer
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="p-4 rounded-xl bg-background/50 border border-border hover:shadow-soft transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Help & FAQs */}
      <Card className="p-6 gradient-card shadow-soft border-2">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-secondary" />
          Frequently Asked Questions
        </h3>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      {/* Contact Support */}
      <Card className="p-6 gradient-card shadow-soft border-2">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-sky" />
          Contact Support
        </h3>
        <p className="text-muted-foreground mb-4">
          Need help? Our support team is here for you. We typically respond within 24 hours.
        </p>
        <Button onClick={handleContactSupport} className="gap-2">
          <MessageSquare className="w-4 h-4" />
          Open Support Form
        </Button>
      </Card>

      {/* Report Issues */}
      <Card className="p-6 gradient-card shadow-soft border-2">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Flag className="w-6 h-6 text-destructive" />
          Report an Issue
        </h3>
        <p className="text-muted-foreground mb-4">
          Help us improve Snuggles by reporting bugs or flagging inappropriate content.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            onClick={() => handleReportIssue("Bug")}
            className="gap-2"
          >
            <Flag className="w-4 h-4" />
            Report Bug
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleReportIssue("Content")}
            className="gap-2"
          >
            <Flag className="w-4 h-4" />
            Flag Content
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleReportIssue("AI Response")}
            className="gap-2"
          >
            <Flag className="w-4 h-4" />
            Report AI Issue
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Essentials;