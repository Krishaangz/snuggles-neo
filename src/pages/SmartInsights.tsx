import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, TrendingUp, Calendar } from "lucide-react";

const SmartInsights = () => {
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
            <div className="w-16 h-16 rounded-2xl bg-sky/10 border-2 border-sky/20 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-sky" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Smart Insights
              </span>
            </h1>
            <p className="text-muted-foreground">
              Personalized insights that adapt to your parenting journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 gradient-card shadow-soft border-2">
              <TrendingUp className="w-8 h-8 text-sky mb-4" />
              <h3 className="text-xl font-semibold mb-2">Daily Insights</h3>
              <p className="text-muted-foreground mb-4">
                Receive personalized daily tips and insights based on your baby's current stage.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: AI-powered daily recommendations and tips
              </div>
            </Card>

            <Card className="p-6 gradient-card shadow-soft border-2">
              <Calendar className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Weekly Summary</h3>
              <p className="text-muted-foreground mb-4">
                Get comprehensive weekly reports on growth, sleep, feeding, and development.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Detailed analytics and progress reports
              </div>
            </Card>

            <Card className="p-6 gradient-card shadow-soft border-2 md:col-span-2">
              <Sparkles className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-4">Personalized Recommendations</h3>
              <p className="text-muted-foreground mb-4">
                AI-driven suggestions that learn from your interactions and adapt to your preferences.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Smart recommendations engine and adaptive learning
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartInsights;
