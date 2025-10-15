import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, TrendingUp, Baby, Ruler, Scale, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GrowthTracker = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isPremium } = useAuthStore();
  const [measurements, setMeasurements] = useState(() => {
    const saved = localStorage.getItem("growth_tracker_data");
    return saved ? JSON.parse(saved) : [];
  });
  const [babyAge, setBabyAge] = useState(6);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headCircumference, setHeadCircumference] = useState("");
  const [gender, setGender] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    localStorage.setItem("growth_tracker_data", JSON.stringify(measurements));
  }, [measurements]);

  const addMeasurement = () => {
    if (!user) {
      toast({ title: "Please login to track growth", variant: "destructive" });
      return;
    }

    if (!weight || !height || !gender) {
      toast({ title: "Please enter weight, height, and gender", variant: "destructive" });
      return;
    }

    const measurement = {
      date: new Date().toISOString(),
      weight: parseFloat(weight),
      height: parseFloat(height),
      headCircumference: headCircumference ? parseFloat(headCircumference) : null,
      ageInMonths: babyAge,
      gender,
    };

    setMeasurements([...measurements, measurement]);
    setWeight("");
    setHeight("");
    setHeadCircumference("");
    toast({ title: "Measurement added!" });
  };

  const analyzeGrowth = async () => {
    if (!isPremium()) {
      toast({ title: "Premium Feature", description: "Upgrade to unlock AI analysis", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data } = await supabase.functions.invoke("analyze-growth", {
        body: { measurements, babyAge, gender },
      });
      setAiAnalysis(data.analysis);
      toast({ title: "Analysis complete!" });
    } catch (error) {
      toast({ title: "Analysis failed", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const exportData = () => {
    if (!isPremium()) {
      toast({ title: "Premium Feature", description: "Upgrade to export data", variant: "destructive" });
      return;
    }

    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Age (months),Weight (kg),Height (cm),Head Circumference (cm),Gender\n"
      + measurements.map(m => `${m.date},${m.ageInMonths},${m.weight},${m.height},${m.headCircumference || 'N/A'},${m.gender}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "growth_tracker_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({ title: "Data exported successfully!" });
  };

  const current = measurements[measurements.length - 1];
  const trend = measurements.length >= 2 ? {
    weightChange: parseFloat((measurements[measurements.length - 1].weight - measurements[measurements.length - 2].weight).toFixed(2)),
    heightChange: parseFloat((measurements[measurements.length - 1].height - measurements[measurements.length - 2].height).toFixed(2))
  } : null;

  // Prepare chart data
  const chartData = measurements.map((m: any, index: number) => ({
    name: `M${index + 1}`,
    date: new Date(m.date).toLocaleDateString(),
    weight: m.weight,
    height: m.height,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background p-8">
      <div className="container mx-auto max-w-6xl">
        <Button onClick={() => navigate("/dashboard")} variant="outline" className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-4 animate-pulse-ring">
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Growth Tracker
            </span>
          </h1>
          <p className="text-muted-foreground">WHO-standard growth analysis</p>
        </div>

        {current && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="gradient-card shadow-soft border-2 animate-scale-in">
              <CardHeader><CardTitle className="flex items-center gap-2"><Scale className="w-5 h-5 text-primary" />Weight</CardTitle></CardHeader>
              <CardContent><p className="text-3xl font-bold">{current.weight} kg</p>{trend && <p className="text-sm text-muted-foreground mt-2">{trend.weightChange > 0 ? '+' : ''}{trend.weightChange} kg</p>}</CardContent>
            </Card>
            <Card className="gradient-card shadow-soft border-2 animate-scale-in stagger-1">
              <CardHeader><CardTitle className="flex items-center gap-2"><Ruler className="w-5 h-5 text-accent" />Height</CardTitle></CardHeader>
              <CardContent><p className="text-3xl font-bold">{current.height} cm</p>{trend && <p className="text-sm text-muted-foreground mt-2">{trend.heightChange > 0 ? '+' : ''}{trend.heightChange} cm</p>}</CardContent>
            </Card>
            <Card className="gradient-card shadow-soft border-2 animate-scale-in stagger-2">
              <CardHeader><CardTitle className="flex items-center gap-2"><Baby className="w-5 h-5 text-secondary" />Gender</CardTitle></CardHeader>
              <CardContent><p className="text-3xl font-bold capitalize">{current.gender}</p><p className="text-sm text-muted-foreground mt-2">Baby's sex</p></CardContent>
            </Card>
            <Card className="gradient-card shadow-soft border-2 animate-scale-in stagger-2">
              <CardHeader><CardTitle className="flex items-center gap-2"><Baby className="w-5 h-5 text-secondary" />Records</CardTitle></CardHeader>
              <CardContent><p className="text-3xl font-bold">{measurements.length}</p><p className="text-sm text-muted-foreground mt-2">Total tracked</p></CardContent>
            </Card>
          </div>
        )}

        <Card className="p-6 gradient-card shadow-medium border-2 mb-6">
          <h3 className="text-xl font-semibold mb-4">Add Measurement</h3>
          <div className="grid md:grid-cols-5 gap-4">
            <div><Label>Age (months)</Label><Input type="number" value={babyAge} onChange={(e) => setBabyAge(parseInt(e.target.value))} /></div>
            <div><Label>Weight (kg)</Label><Input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} /></div>
            <div><Label>Height (cm)</Label><Input type="number" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} /></div>
            <div><Label>Head (cm)</Label><Input type="number" step="0.1" value={headCircumference} onChange={(e) => setHeadCircumference(e.target.value)} /></div>
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={addMeasurement} className="flex-1">Add</Button>
            <Button onClick={analyzeGrowth} variant="outline" className="flex-1" disabled={isAnalyzing}>{isAnalyzing ? "Analyzing..." : "AI Analysis"}</Button>
            <Button onClick={exportData} variant="outline" className="flex-1">Export Data</Button>
          </div>
        </Card>

        {measurements.length >= 2 && (
          <Card className="p-6 mb-6 gradient-card shadow-medium border-2">
            <h3 className="text-xl font-semibold mb-4">Growth Charts</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Weight Progression</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Height Progression</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="height" stroke="hsl(var(--accent))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        )}

        {aiAnalysis && (
          <Card className="p-6 mb-6 animate-fade-in-up border-primary/20">
            <div className="flex gap-3"><AlertCircle className="w-6 h-6 text-primary mt-1" />
            <div><h3 className="text-lg font-semibold mb-2">WHO Analysis</h3><div className="text-muted-foreground whitespace-pre-wrap">{aiAnalysis}</div></div></div>
          </Card>
        )}

        {measurements.length > 0 && (
          <Card className="p-6"><h3 className="text-xl font-semibold mb-4">History</h3>
          <div className="space-y-3">{measurements.slice().reverse().map((m: any, i: number) => (
            <div key={i} className="flex justify-between p-4 bg-muted/30 rounded-lg border">
              <div><p className="font-semibold">{new Date(m.date).toLocaleDateString()}</p><p className="text-sm text-muted-foreground">Age: {m.ageInMonths}m • {m.gender}</p></div>
              <div className="text-right"><p className="text-sm">W: {m.weight}kg</p><p className="text-sm">H: {m.height}cm</p></div>
            </div>
          ))}</div></Card>
        )}
      </div>
    </div>
  );
};

export default GrowthTracker;
