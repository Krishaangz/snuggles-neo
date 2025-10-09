import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Smile, Brain } from "lucide-react";

const ParentWellness = () => {
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
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Parent Wellness
              </span>
            </h1>
            <p className="text-muted-foreground">
              Take care of yourself while caring for your baby
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 gradient-card shadow-soft border-2">
              <Smile className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mood Tracking</h3>
              <p className="text-muted-foreground mb-4">
                Monitor your emotional well-being with daily check-ins and supportive insights.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Mood journal and emotional wellness tracking
              </div>
            </Card>

            <Card className="p-6 gradient-card shadow-soft border-2">
              <Brain className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mindfulness</h3>
              <p className="text-muted-foreground mb-4">
                Quick mindfulness exercises and breathing techniques for stress relief.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Guided meditation sessions and relaxation exercises
              </div>
            </Card>

            <Card className="p-6 gradient-card shadow-soft border-2 md:col-span-2">
              <Heart className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Daily Affirmations</h3>
              <p className="text-muted-foreground mb-4">
                Receive encouraging messages and positive affirmations to boost your confidence.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Personalized affirmations and community support
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentWellness;
