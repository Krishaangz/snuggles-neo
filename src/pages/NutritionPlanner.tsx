import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, UtensilsCrossed, Apple, Milk, Calendar } from "lucide-react";
import { toast } from "sonner";

interface MealEntry {
  date: string;
  mealType: string;
  foodItems: string;
  quantity: string;
  notes: string;
}

const mealSuggestions = {
  "0-6 months": {
    breakfast: ["Breast milk", "Formula milk"],
    lunch: ["Breast milk", "Formula milk"],
    dinner: ["Breast milk", "Formula milk"],
  },
  "6-12 months": {
    breakfast: ["Rice cereal", "Banana puree", "Apple sauce"],
    lunch: ["Vegetable puree", "Chicken puree", "Lentil soup"],
    dinner: ["Sweet potato mash", "Carrot puree", "Peas and rice"],
  },
  "12+ months": {
    breakfast: ["Oatmeal with fruits", "Scrambled eggs", "Whole grain toast"],
    lunch: ["Rice with vegetables", "Pasta", "Soft chicken pieces"],
    dinner: ["Mashed potatoes", "Steamed fish", "Vegetable curry"],
  },
};

const NutritionPlanner = () => {
  const navigate = useNavigate();
  const [mealData, setMealData] = useState<MealEntry[]>([]);
  const [mealType, setMealType] = useState("");
  const [foodItems, setFoodItems] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [ageRange, setAgeRange] = useState<keyof typeof mealSuggestions>("6-12 months");

  useEffect(() => {
    const userData = localStorage.getItem("nutrition_planner_data");
    if (userData) {
      setMealData(JSON.parse(userData));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: MealEntry = {
      date: new Date().toLocaleDateString(),
      mealType,
      foodItems,
      quantity,
      notes,
    };

    const updatedData = [...mealData, newEntry];
    setMealData(updatedData);
    localStorage.setItem("nutrition_planner_data", JSON.stringify(updatedData));
    
    toast.success("Meal logged successfully!");
    setMealType("");
    setFoodItems("");
    setQuantity("");
    setNotes("");
  };

  const getTodaysMeals = () => {
    const today = new Date().toLocaleDateString();
    return mealData.filter(meal => meal.date === today).length;
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

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card className="gradient-card shadow-soft border-2 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Today's Meals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{getTodaysMeals()}</p>
                <p className="text-sm text-muted-foreground mt-2">Logged so far</p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-soft border-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="w-5 h-5 text-accent" />
                  Total Meals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{mealData.length}</p>
                <p className="text-sm text-muted-foreground mt-2">All time</p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-soft border-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Milk className="w-5 h-5 text-secondary" />
                  Nutrition Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">Good</p>
                <p className="text-sm text-muted-foreground mt-2">Balanced diet</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 gradient-card shadow-medium border-2">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-primary" />
                Log Meal
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="mealType">Meal Type</Label>
                  <Select value={mealType} onValueChange={setMealType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="foodItems">Food Items</Label>
                  <Input
                    id="foodItems"
                    value={foodItems}
                    onChange={(e) => setFoodItems(e.target.value)}
                    placeholder="e.g., Rice cereal, banana"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g., 1 bowl, 50ml"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any allergies, reactions, or observations"
                  />
                </div>
                <Button type="submit" className="w-full">Log Meal</Button>
              </form>
            </Card>

            <Card className="p-6 gradient-card shadow-soft border-2">
              <h3 className="text-xl font-semibold mb-4">Meal Suggestions</h3>
              <div className="space-y-4">
                <div>
                  <Label>Baby's Age Range</Label>
                  <Select value={ageRange} onValueChange={(val) => setAgeRange(val as keyof typeof mealSuggestions)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-6 months">0-6 months</SelectItem>
                      <SelectItem value="6-12 months">6-12 months</SelectItem>
                      <SelectItem value="12+ months">12+ months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="font-semibold mb-2">🌅 Breakfast Ideas</p>
                    <ul className="text-sm space-y-1">
                      {mealSuggestions[ageRange].breakfast.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="font-semibold mb-2">☀️ Lunch Ideas</p>
                    <ul className="text-sm space-y-1">
                      {mealSuggestions[ageRange].lunch.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="font-semibold mb-2">🌙 Dinner Ideas</p>
                    <ul className="text-sm space-y-1">
                      {mealSuggestions[ageRange].dinner.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 gradient-card shadow-soft border-2">
            <h3 className="text-xl font-semibold mb-4">Meal History</h3>
            <div className="space-y-3">
              {mealData.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No meals logged yet. Start tracking your baby's nutrition above!</p>
              ) : (
                mealData.slice().reverse().map((entry, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold">{entry.date}</p>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {entry.mealType}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Food Items</p>
                        <p className="font-medium">{entry.foodItems}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Quantity</p>
                        <p className="font-medium">{entry.quantity}</p>
                      </div>
                    </div>
                    {entry.notes && (
                      <div className="mt-2 text-sm">
                        <p className="text-muted-foreground">Notes</p>
                        <p className="font-medium">{entry.notes}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NutritionPlanner;
