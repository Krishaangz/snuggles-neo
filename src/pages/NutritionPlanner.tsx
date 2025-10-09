import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UtensilsCrossed, Apple, Milk } from "lucide-react";

const NutritionPlanner = () => {
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
              <UtensilsCrossed className="w-8 h-8 text-sky" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Nutrition Planner
              </span>
            </h1>
            <p className="text-muted-foreground">
              Dynamic meal planning tailored to your baby's needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 gradient-card shadow-soft border-2">
              <Apple className="w-8 h-8 text-sky mb-4" />
              <h3 className="text-xl font-semibold mb-2">Meal Plans</h3>
              <p className="text-muted-foreground mb-4">
                Age-appropriate meal suggestions with nutritional balance and allergen considerations.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Weekly meal planner and recipe suggestions
              </div>
            </Card>

            <Card className="p-6 gradient-card shadow-soft border-2">
              <Milk className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Feeding Schedule</h3>
              <p className="text-muted-foreground mb-4">
                Track breastfeeding, formula, and solid food introduction with smart reminders.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Feeding tracker and hydration monitoring
              </div>
            </Card>

            <Card className="p-6 gradient-card shadow-soft border-2 md:col-span-2">
              <UtensilsCrossed className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-4">Nutritional Guidance</h3>
              <p className="text-muted-foreground mb-4">
                Evidence-based nutritional advice from WHO, UNICEF, and AAP pediatric experts.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Personalized nutrition recommendations and food safety tips
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPlanner;
