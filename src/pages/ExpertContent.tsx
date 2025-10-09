import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Video, FileText } from "lucide-react";

const ExpertContent = () => {
  const navigate = useNavigate();

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

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 border-2 border-secondary/20 flex items-center justify-center mx-auto mb-4">
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

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 gradient-card shadow-soft border-2">
              <Video className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Video Library</h3>
              <p className="text-muted-foreground mb-4">
                Expert-led videos on baby care, development, and parenting techniques.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Curated video content from WHO, UNICEF, NHS, and AAP
              </div>
            </Card>

            <Card className="p-6 gradient-card shadow-soft border-2">
              <FileText className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Articles & Guides</h3>
              <p className="text-muted-foreground mb-4">
                In-depth articles on milestones, health, safety, and postpartum care.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Searchable article library with expert verification
              </div>
            </Card>

            <Card className="p-6 gradient-card shadow-soft border-2 md:col-span-2">
              <BookOpen className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Personalized Recommendations</h3>
              <p className="text-muted-foreground mb-4">
                AI-curated content based on your baby's age, development stage, and your interests.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Smart content recommendations and learning pathways
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertContent;
