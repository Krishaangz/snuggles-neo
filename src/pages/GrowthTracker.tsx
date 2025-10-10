import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, LineChart, TrendingUp, Baby, Ruler, Scale } from "lucide-react";
import { authStore } from "@/stores/authStore";
import { toast } from "sonner";

interface GrowthData {
  date: string;
  weight: number;
  height: number;
  headCircumference: number;
}

const GrowthTracker = () => {
  const navigate = useNavigate();
  const [growthData, setGrowthData] = useState<GrowthData[]>([]);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headCircumference, setHeadCircumference] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("growth_tracker_data");
    if (userData) {
      setGrowthData(JSON.parse(userData));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: GrowthData = {
      date: new Date().toLocaleDateString(),
      weight: parseFloat(weight),
      height: parseFloat(height),
      headCircumference: parseFloat(headCircumference),
    };

    const updatedData = [...growthData, newEntry];
    setGrowthData(updatedData);
    localStorage.setItem("growth_tracker_data", JSON.stringify(updatedData));
    
    toast.success("Growth data recorded successfully!");
    setWeight("");
    setHeight("");
    setHeadCircumference("");
  };

  const getLatestMetric = (metric: keyof Omit<GrowthData, 'date'>) => {
    if (growthData.length === 0) return "No data";
    return `${growthData[growthData.length - 1][metric]} ${metric === 'weight' ? 'kg' : 'cm'}`;
  };

  const getGrowthTrend = () => {
    if (growthData.length < 2) return "Need more data";
    const latest = growthData[growthData.length - 1];
    const previous = growthData[growthData.length - 2];
    const weightChange = parseFloat(((latest.weight - previous.weight) / previous.weight * 100).toFixed(1));
    return `${weightChange > 0 ? '+' : ''}${weightChange}% from last entry`;
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

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card className="gradient-card shadow-soft border-2 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  Current Weight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{getLatestMetric('weight')}</p>
                <p className="text-sm text-muted-foreground mt-2">{getGrowthTrend()}</p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-soft border-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-accent" />
                  Current Height
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{getLatestMetric('height')}</p>
                <p className="text-sm text-muted-foreground mt-2">Following WHO growth curve</p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-soft border-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Baby className="w-5 h-5 text-secondary" />
                  Head Circumference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{getLatestMetric('headCircumference')}</p>
                <p className="text-sm text-muted-foreground mt-2">Healthy development</p>
              </CardContent>
            </Card>
          </div>

          <Card className="p-6 gradient-card shadow-medium border-2 mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Add New Measurement
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g., 5.2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g., 52.5"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="head">Head Circumference (cm)</Label>
                  <Input
                    id="head"
                    type="number"
                    step="0.1"
                    value={headCircumference}
                    onChange={(e) => setHeadCircumference(e.target.value)}
                    placeholder="e.g., 35.0"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">Record Measurement</Button>
            </form>
          </Card>

          <Card className="p-6 gradient-card shadow-soft border-2">
            <h3 className="text-xl font-semibold mb-4">Growth History</h3>
            <div className="space-y-3">
              {growthData.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No growth data recorded yet. Add your first measurement above!</p>
              ) : (
                growthData.slice().reverse().map((entry, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{entry.date}</p>
                        <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Weight</p>
                            <p className="font-medium">{entry.weight} kg</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Height</p>
                            <p className="font-medium">{entry.height} cm</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Head</p>
                            <p className="font-medium">{entry.headCircumference} cm</p>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default GrowthTracker;
