import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, CloudMoon, Sun } from "lucide-react";

const SleepAnalyzer = () => {
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
            <div className="w-16 h-16 rounded-2xl bg-accent/10 border-2 border-accent/20 flex items-center justify-center mx-auto mb-4">
              <Moon className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Sleep & Cry Analyzer
              </span>
            </h1>
            <p className="text-muted-foreground">
              Understand and optimize your baby's sleep patterns
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 gradient-card shadow-soft border-2">
              <CloudMoon className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sleep Patterns</h3>
              <p className="text-muted-foreground mb-4">
                AI-powered analysis of sleep duration, quality, and optimal bedtime routines.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Sleep tracking and pattern recognition
              </div>
            </Card>

            <Card className="p-6 gradient-card shadow-soft border-2">
              <Moon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cry Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Understand different cry types and get suggestions for comfort techniques.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Audio-based cry detection and interpretation
              </div>
            </Card>

            <Card className="p-6 gradient-card shadow-soft border-2 md:col-span-2">
              <Sun className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Bedtime Routines</h3>
              <p className="text-muted-foreground mb-4">
                Get personalized bedtime routine suggestions based on your baby's age and sleep patterns.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Custom routine builder and sleep environment recommendations
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepAnalyzer;
