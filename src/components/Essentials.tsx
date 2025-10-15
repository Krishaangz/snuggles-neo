import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, Lightbulb, HelpCircle, MessageSquare, Flag, Bot, LineChart, Moon, UtensilsCrossed, Sparkles, BookOpen, AlertCircle, Upload, X, Image, FileText } from "lucide-react";
import { toast } from "sonner";
import ceoImage from "@/assets/ceo-kayze.png";

const Essentials = () => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [reportType, setReportType] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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
    if (!contactName || !contactEmail || !contactMessage) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Support request submitted! Our team typically responds within 24 hours.");
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    const maxSize = 5 * 1024 * 1024;
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        toast.error(`${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });

    const currentTotal = uploadedFiles.length + validFiles.length;
    if (currentTotal > 5) {
      toast.error("You can upload a maximum of 5 files.");
      setUploadedFiles([...uploadedFiles, ...validFiles].slice(0, 5));
    } else {
      setUploadedFiles([...uploadedFiles, ...validFiles]);
      toast.success(`${validFiles.length} file(s) added successfully`);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    toast.success("File removed");
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleReportIssue = () => {
    if (!reportType || !reportDescription) {
      toast.error("Please select a type and describe the issue");
      return;
    }
    
    const fileCount = uploadedFiles.length;
    const message = fileCount > 0 
      ? `${reportType} report submitted with ${fileCount} file(s). Thank you for helping us improve!`
      : `${reportType} report submitted. Thank you for helping us improve!`;
    
    toast.success(message);
    setReportType("");
    setReportDescription("");
    setUploadedFiles([]);
  };

  return (
    <div className="space-y-8 py-6">
      <Card className="p-8 gradient-card shadow-soft border-2 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Heart className="w-8 h-8 text-primary" />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              About Snuggles
            </span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-muted-foreground">
              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Our Story
                </h4>
                <p className="leading-relaxed">
                  Snuggles was born from a simple truth — parenting can be overwhelming, even when it's beautiful. We wanted to create something that doesn't just give answers, but understands emotions.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  Our Vision
                </h4>
                <p className="leading-relaxed">
                  To make Snuggles the world's most trusted AI-driven baby wellness companion, where every insight is safe, every suggestion is kind, and every moment feels supported.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Heart className="w-5 h-5 text-secondary" />
                  Our Mission
                </h4>
                <p className="leading-relaxed">
                  To empower parents worldwide with personalized, expert-approved, and emotionally intelligent babycare, uniting verified science with heartfelt design.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <img 
                  src={ceoImage} 
                  alt="CEO Kayze" 
                  className="relative w-64 h-64 object-cover rounded-2xl border-4 border-primary/20 shadow-float"
                />
              </div>
              <div className="text-center">
                <h5 className="text-xl font-bold">Krishang Saharia</h5>
                <p className="text-sm text-muted-foreground">CEO, Snuggles</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 gradient-card shadow-soft border-2">
        <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-accent" />
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            What We Offer
          </span>
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="p-6 rounded-xl bg-gradient-to-br from-background to-muted/30 border border-border hover:shadow-medium hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
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

      <Card className="p-8 gradient-card shadow-soft border-2">
        <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-secondary" />
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        </h3>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      <Card className="p-8 gradient-card shadow-soft border-2">
        <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-sky" />
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Contact Support
          </span>
        </h3>
        <p className="text-muted-foreground mb-6">
          Need help? Our support team is here for you. We typically respond within 24 hours.
        </p>
        <div className="space-y-4">
          <div>
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div>
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Describe your issue or question..."
              rows={4}
            />
          </div>
          <Button onClick={handleContactSupport} className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Submit Support Request
          </Button>
        </div>
      </Card>

      <Card className="p-8 gradient-card shadow-soft border-2">
        <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Flag className="w-8 h-8 text-destructive" />
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Report an Issue
          </span>
        </h3>
        <p className="text-muted-foreground mb-6">
          Help us improve Snuggles by reporting bugs or flagging inappropriate content. You can attach screenshots or files as evidence.
        </p>
        <div className="space-y-4">
          <div>
            <Label htmlFor="report-type">Issue Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger id="report-type">
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bug Report">Bug Report</SelectItem>
                <SelectItem value="Content Report">Content Report</SelectItem>
                <SelectItem value="AI Report">AI Response Issue</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="report-description">Description</Label>
            <Textarea
              id="report-description"
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              placeholder="Please describe the issue in detail..."
              rows={4}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="file-upload">Attach Evidence (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file-upload"
                type="file"
                multiple
                accept="image/*,.pdf,.txt,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="gap-2"
                disabled={uploadedFiles.length >= 5}
              >
                <Upload className="w-4 h-4" />
                Upload Files
              </Button>
              <span className="text-sm text-muted-foreground">
                Max 5 files, 5MB each
              </span>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2 mt-4">
                <p className="text-sm font-medium">Uploaded Files ({uploadedFiles.length}/5):</p>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                          {getFileIcon(file)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button onClick={handleReportIssue} variant="destructive" className="gap-2">
            <Flag className="w-4 h-4" />
            Submit Report
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Essentials;
