import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LineChart, TrendingUp } from "lucide-react";

const GrowthTracker = () => {
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
              <LineChart className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Growth Tracker
              </span>
            </h1>
            <p className="text-muted-foreground">
              Track your baby's growth against WHO standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 gradient-card shadow-soft border-2">
              <TrendingUp className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Height Tracking</h3>
              <p className="text-muted-foreground mb-4">
                Monitor your baby's height development with AI-powered insights against WHO growth charts.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Interactive growth charts and milestone tracking
              </div>
            </Card>

            <Card className="p-6 gradient-card shadow-soft border-2">
              <LineChart className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Weight Tracking</h3>
              <p className="text-muted-foreground mb-4">
                Keep track of healthy weight gain patterns with personalized recommendations.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Weight trend analysis and nutritional guidance
              </div>
            </Card>

            <Card className="p-6 gradient-card shadow-soft border-2 md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">Developmental Milestones</h3>
              <p className="text-muted-foreground mb-4">
                Track important developmental milestones and get timely reminders for health checkups.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Milestone checklist and developmental assessment tools
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthTracker;
