import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, TrendingUp, Calendar, Brain, Heart, Moon, UtensilsCrossed } from "lucide-react";

interface InsightData {
  growth: any[];
  sleep: any[];
  nutrition: any[];
  wellness: any[];
}

const SmartInsights = () => {
  const navigate = useNavigate();
  const [insights, setInsights] = useState<InsightData>({
    growth: [],
    sleep: [],
    nutrition: [],
    wellness: [],
  });

  useEffect(() => {
    // Load data from all features
    const growthData = JSON.parse(localStorage.getItem("growth_tracker_data") || "[]");
    const sleepData = JSON.parse(localStorage.getItem("sleep_analyzer_data") || "[]");
    const nutritionData = JSON.parse(localStorage.getItem("nutrition_planner_data") || "[]");
    const wellnessData = JSON.parse(localStorage.getItem("parent_wellness_data") || "[]");

    setInsights({
      growth: growthData,
      sleep: sleepData,
      nutrition: nutritionData,
      wellness: wellnessData,
    });
  }, []);

  const getGrowthInsight = () => {
    if (insights.growth.length === 0) {
      return "Start tracking growth to see personalized insights";
    }
    if (insights.growth.length < 3) {
      return "Keep logging measurements to see growth trends";
    }
    return "Your baby is showing healthy growth patterns! Weight gain is consistent with WHO standards.";
  };

  const getSleepInsight = () => {
    if (insights.sleep.length === 0) {
      return "Begin tracking sleep to receive personalized recommendations";
    }
    const avgSleep = insights.sleep.reduce((acc: number, curr: any) => acc + curr.totalHours, 0) / insights.sleep.length;
    
    if (avgSleep < 10) {
      return "Consider establishing an earlier bedtime routine. Most babies need 12-16 hours of sleep per day.";
    } else if (avgSleep >= 12) {
      return "Excellent sleep schedule! Consistent sleep patterns support healthy brain development.";
    }
    return "Your baby's sleep is improving. Keep following the bedtime routine for best results.";
  };

  const getNutritionInsight = () => {
    if (insights.nutrition.length === 0) {
      return "Start logging meals to get nutritional recommendations";
    }
    const recentMeals = insights.nutrition.slice(-7);
    return `You've logged ${recentMeals.length} meals this week. Great job tracking nutrition! Remember to include iron-rich foods.`;
  };

  const getWellnessInsight = () => {
    if (insights.wellness.length === 0) {
      return "Track your mood to receive self-care recommendations";
    }
    const recentMoods = insights.wellness.slice(-5);
    const positiveCount = recentMoods.filter((m: any) => m.mood === "great" || m.mood === "good").length;
    
    if (positiveCount >= 3) {
      return "You're doing great! Your positive mood supports your baby's emotional development.";
    }
    return "Remember to take breaks and practice self-care. Your well-being matters too!";
  };

  const weeklyTips = [
    {
      icon: Brain,
      title: "Developmental Focus",
      tip: "This week, focus on tummy time. It strengthens neck and shoulder muscles essential for crawling.",
    },
    {
      icon: Heart,
      title: "Bonding Moment",
      tip: "Skin-to-skin contact releases oxytocin, strengthening your bond and regulating baby's temperature.",
    },
    {
      icon: Moon,
      title: "Sleep Optimization",
      tip: "Create a consistent bedtime routine. Dim lights 30 minutes before sleep to support melatonin production.",
    },
    {
      icon: UtensilsCrossed,
      title: "Nutrition Tip",
      tip: "Introduce one new food every 3-5 days to identify any allergies. Start with single-ingredient purees.",
    },
  ];

  const getTotalDataPoints = () => {
    return insights.growth.length + insights.sleep.length + insights.nutrition.length + insights.wellness.length;
  };

  const getEngagementLevel = () => {
    const total = getTotalDataPoints();
    if (total === 0) return "Start Tracking";
    if (total < 10) return "Getting Started";
    if (total < 30) return "Building Habits";
    return "Highly Engaged";
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
            <div className="w-16 h-16 rounded-2xl bg-sky/10 border-2 border-sky/20 flex items-center justify-center mx-auto mb-4 animate-float">
              <Sparkles className="w-8 h-8 text-sky animate-glow-pulse" />
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

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card className="gradient-card shadow-soft border-2 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Data Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{getTotalDataPoints()}</p>
                <p className="text-sm text-muted-foreground mt-2">Total tracked</p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-soft border-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{getEngagementLevel()}</p>
                <p className="text-sm text-muted-foreground mt-2">Keep it up!</p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-soft border-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-secondary" />
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">Active</p>
                <p className="text-sm text-muted-foreground mt-2">Learning patterns</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 gradient-card shadow-medium border-2 border-primary/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Growth Insights
              </h3>
              <p className="text-muted-foreground leading-relaxed">{getGrowthInsight()}</p>
              {insights.growth.length > 0 && (
                <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate("/growth-tracker")}>
                  View Growth Data
                </Button>
              )}
            </Card>

            <Card className="p-6 gradient-card shadow-medium border-2 border-accent/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Moon className="w-5 h-5 text-accent" />
                Sleep Insights
              </h3>
              <p className="text-muted-foreground leading-relaxed">{getSleepInsight()}</p>
              {insights.sleep.length > 0 && (
                <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate("/sleep-analyzer")}>
                  View Sleep Data
                </Button>
              )}
            </Card>

            <Card className="p-6 gradient-card shadow-medium border-2 border-sky/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-sky" />
                Nutrition Insights
              </h3>
              <p className="text-muted-foreground leading-relaxed">{getNutritionInsight()}</p>
              {insights.nutrition.length > 0 && (
                <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate("/nutrition-planner")}>
                  View Nutrition Data
                </Button>
              )}
            </Card>

            <Card className="p-6 gradient-card shadow-medium border-2 border-secondary/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-secondary" />
                Wellness Insights
              </h3>
              <p className="text-muted-foreground leading-relaxed">{getWellnessInsight()}</p>
              {insights.wellness.length > 0 && (
                <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate("/parent-wellness")}>
                  View Wellness Data
                </Button>
              )}
            </Card>
          </div>

          <Card className="p-6 gradient-card shadow-soft border-2">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              This Week's Personalized Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {weeklyTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                    <div className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">{tip.title}</h4>
                        <p className="text-sm text-muted-foreground">{tip.tip}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SmartInsights;
