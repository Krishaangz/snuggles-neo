import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Video, FileText, Search, ExternalLink, Shield } from "lucide-react";

interface ContentItem {
  id: number;
  type: "article" | "video" | "guide";
  title: string;
  source: string;
  category: string;
  description: string;
  url: string;
  verified: boolean;
}

const contentLibrary: ContentItem[] = [
  {
    id: 1,
    type: "article",
    title: "Infant and Young Child Feeding Guidelines",
    source: "WHO",
    category: "Nutrition",
    description: "Comprehensive feeding recommendations from birth to 2 years based on WHO standards.",
    url: "https://www.who.int/health-topics/infant-nutrition",
    verified: true,
  },
  {
    id: 2,
    type: "guide",
    title: "Developmental Milestones",
    source: "CDC",
    category: "Development",
    description: "Track your baby's development with evidence-based milestone checklists.",
    url: "https://www.cdc.gov/ncbddd/actearly/milestones/index.html",
    verified: true,
  },
  {
    id: 3,
    type: "article",
    title: "Safe Sleep Practices",
    source: "AAP",
    category: "Safety",
    description: "American Academy of Pediatrics guidelines for safe infant sleep environments.",
    url: "https://www.aap.org/en/patient-care/safe-sleep/",
    verified: true,
  },
  {
    id: 4,
    type: "guide",
    title: "Vaccination Schedule",
    source: "UNICEF",
    category: "Health",
    description: "Complete immunization schedule and vaccine information for infants and children.",
    url: "https://www.unicef.org/immunization",
    verified: true,
  },
  {
    id: 5,
    type: "article",
    title: "Postpartum Care for Mothers",
    source: "NHS",
    category: "Parent Health",
    description: "Essential guidance on postpartum recovery and maternal health.",
    url: "https://www.nhs.uk/conditions/baby/support-and-services/",
    verified: true,
  },
  {
    id: 6,
    type: "guide",
    title: "First Aid for Babies",
    source: "Red Cross",
    category: "Emergency",
    description: "Essential first aid techniques every parent should know.",
    url: "https://www.redcross.org/take-a-class/first-aid/baby-first-aid",
    verified: true,
  },
  {
    id: 7,
    type: "article",
    title: "Breastfeeding Support",
    source: "WHO",
    category: "Nutrition",
    description: "Evidence-based breastfeeding guidance and troubleshooting tips.",
    url: "https://www.who.int/health-topics/breastfeeding",
    verified: true,
  },
  {
    id: 8,
    type: "guide",
    title: "Baby Growth Charts",
    source: "WHO",
    category: "Development",
    description: "Standard growth charts and how to interpret your baby's measurements.",
    url: "https://www.who.int/tools/child-growth-standards",
    verified: true,
  },
];

const ExpertContent = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "Nutrition", "Development", "Safety", "Health", "Parent Health", "Emergency"];

  const filteredContent = contentLibrary.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="w-4 h-4" />;
      case "guide": return <BookOpen className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video": return "bg-secondary/10 text-secondary";
      case "guide": return "bg-accent/10 text-accent";
      default: return "bg-primary/10 text-primary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={() => navigate("/dashboard")}
          variant="outline"
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 border-2 border-secondary/20 flex items-center justify-center mx-auto mb-4 animate-float">
              <BookOpen className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Expert Content Hub
              </span>
            </h1>
            <p className="text-muted-foreground">
              Verified educational content from trusted health organizations
            </p>
          </div>

          <Card className="p-6 gradient-card shadow-medium border-2 mb-8">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, guides, and videos..."
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" ? "All Content" : category}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredContent.map((item, index) => (
              <Card
                key={item.id}
                className="gradient-card shadow-soft border-2 hover:shadow-medium transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                      {getTypeIcon(item.type)}
                    </div>
                    {item.verified && (
                      <Badge variant="secondary" className="gap-1">
                        <Shield className="w-3 h-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline">{item.source}</Badge>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => window.open(item.url, '_blank')}
                  >
                    Read More
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <Card className="p-12 text-center gradient-card shadow-soft border-2">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No content found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or category filters
              </p>
            </Card>
          )}

          <Card className="p-6 gradient-card shadow-soft border-2 mt-8">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Verified Sources Only</h3>
                <p className="text-sm text-muted-foreground">
                  All content in our library is sourced from WHO, UNICEF, NHS, CDC, AAP, and other verified pediatric health experts. 
                  We ensure every piece of information meets the highest standards of medical accuracy and safety.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExpertContent;
