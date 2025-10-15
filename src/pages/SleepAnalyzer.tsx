import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Moon, CloudMoon, Sun, Clock, Volume2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/stores/authStore";

interface SleepEntry {
  date: string;
  bedtime: string;
  wakeTime: string;
  totalHours: number;
  cryEpisodes: number;
  cryReason: string;
}

const SleepAnalyzer = () => {
  const navigate = useNavigate();
  const { isPremium } = useAuthStore();
  const [sleepData, setSleepData] = useState<SleepEntry[]>([]);
  const [bedtime, setBedtime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [cryEpisodes, setCryEpisodes] = useState("");
  const [cryReason, setCryReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [babyAge, setBabyAge] = useState(6);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("sleep_analyzer_data");
    if (userData) {
      setSleepData(JSON.parse(userData));
    }
  }, []);

  const calculateHours = (bedtime: string, wakeTime: string) => {
    const [bedHour, bedMin] = bedtime.split(':').map(Number);
    const [wakeHour, wakeMin] = wakeTime.split(':').map(Number);
    
    let hours = wakeHour - bedHour;
    let minutes = wakeMin - bedMin;
    
    if (hours < 0) hours += 24;
    if (minutes < 0) {
      hours--;
      minutes += 60;
    }
    
    return hours + minutes / 60;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cryReason === "unknown" && customReason.trim().split(/\s+/).length > 50) {
      toast.error("Custom reason must be 50 words or less");
      return;
    }
    
    const totalHours = calculateHours(bedtime, wakeTime);
    
    const newEntry: SleepEntry = {
      date: new Date().toLocaleDateString(),
      bedtime,
      wakeTime,
      totalHours: parseFloat(totalHours.toFixed(1)),
      cryEpisodes: parseInt(cryEpisodes),
      cryReason: cryReason === "unknown" && customReason.trim() ? customReason.trim() : cryReason,
    };

    const updatedData = [...sleepData, newEntry];
    setSleepData(updatedData);
    localStorage.setItem("sleep_analyzer_data", JSON.stringify(updatedData));
    
    toast.success("Sleep data recorded successfully!");
    setBedtime("");
    setWakeTime("");
    setCryEpisodes("");
    setCryReason("");
    setCustomReason("");
  };

  const getAverageSleep = () => {
    if (sleepData.length === 0) return "No data";
    const avg = sleepData.reduce((acc, curr) => acc + curr.totalHours, 0) / sleepData.length;
    return `${avg.toFixed(1)} hours`;
  };

  const getRecommendation = () => {
    if (sleepData.length === 0) return "Record sleep data to get personalized recommendations";
    const avgSleep = sleepData.reduce((acc, curr) => acc + curr.totalHours, 0) / sleepData.length;
    
    if (avgSleep < 10) {
      return "Consider earlier bedtime routine for better rest";
    } else if (avgSleep > 14) {
      return "Great sleep schedule! Keep it consistent";
    }
    return "Healthy sleep pattern detected";
  };

  const analyzeSleep = async () => {
    if (!isPremium()) {
      toast.error("Premium Feature - Upgrade to unlock AI sleep analysis");
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-sleep", {
        body: { sleepData, babyAge },
      });
      
      if (error) throw error;
      setAiAnalysis(data.analysis);
      toast.success("Analysis complete!");
    } catch (error) {
      toast.error("Analysis failed - please try again");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const exportData = () => {
    if (!isPremium()) {
      toast.error("Premium Feature - Upgrade to export data");
      return;
    }

    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Bedtime,Wake Time,Total Hours,Cry Episodes,Cry Reason\n"
      + sleepData.map(s => `${s.date},${s.bedtime},${s.wakeTime},${s.totalHours},${s.cryEpisodes},${s.cryReason}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sleep_analyzer_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Data exported successfully!");
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
            <div className="w-16 h-16 rounded-2xl bg-accent/10 border-2 border-accent/20 flex items-center justify-center mx-auto mb-4 animate-float">
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

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card className="gradient-card shadow-soft border-2 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  Average Sleep
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{getAverageSleep()}</p>
                <p className="text-sm text-muted-foreground mt-2">Per night</p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-soft border-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudMoon className="w-5 h-5 text-primary" />
                  Sleep Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {sleepData.length > 0 ? "Good" : "N/A"}
                </p>
                <p className="text-sm text-muted-foreground mt-2">{getRecommendation()}</p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-soft border-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-secondary" />
                  Cry Episodes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {sleepData.length > 0 ? Math.round(sleepData.reduce((acc, curr) => acc + curr.cryEpisodes, 0) / sleepData.length) : "0"}
                </p>
                <p className="text-sm text-muted-foreground mt-2">Average per night</p>
              </CardContent>
            </Card>
          </div>

          <Card className="p-6 gradient-card shadow-medium border-2 mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sun className="w-5 h-5 text-primary" />
              Log Sleep Session
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="babyAge">Baby's Age (months)</Label>
                <Input
                  id="babyAge"
                  type="number"
                  value={babyAge}
                  onChange={(e) => setBabyAge(parseInt(e.target.value))}
                  min="0"
                  max="36"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedtime">Bedtime</Label>
                  <Input
                    id="bedtime"
                    type="time"
                    value={bedtime}
                    onChange={(e) => setBedtime(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="waketime">Wake Time</Label>
                  <Input
                    id="waketime"
                    type="time"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="episodes">Number of Cry Episodes</Label>
                  <Input
                    id="episodes"
                    type="number"
                    value={cryEpisodes}
                    onChange={(e) => setCryEpisodes(e.target.value)}
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="reason">Primary Cry Reason</Label>
                  <Select value={cryReason} onValueChange={setCryReason} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hunger">Hunger</SelectItem>
                      <SelectItem value="diaper">Diaper Change</SelectItem>
                      <SelectItem value="discomfort">Discomfort</SelectItem>
                      <SelectItem value="overstimulation">Overstimulation</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {cryReason === "unknown" && (
                <div className="animate-fade-in">
                  <Label htmlFor="customReason">Describe the reason (max 50 words)</Label>
                  <Input
                    id="customReason"
                    type="text"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Describe what might have caused the crying..."
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {customReason.trim().split(/\s+/).filter(w => w).length} / 50 words
                  </p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="submit" className="flex-1">Record Sleep Session</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1" 
                  onClick={analyzeSleep}
                  disabled={isAnalyzing || sleepData.length === 0}
                >
                  {isAnalyzing ? "Analyzing..." : "AI Analysis"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1" 
                  onClick={exportData}
                  disabled={sleepData.length === 0}
                >
                  Export Data
                </Button>
              </div>
            </form>
          </Card>

          {aiAnalysis && (
            <Card className="p-6 mb-8 animate-fade-in border-primary/20">
              <div className="flex gap-3">
                <AlertCircle className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">AAP Sleep Analysis</h3>
                  <div className="text-muted-foreground whitespace-pre-wrap">{aiAnalysis}</div>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6 gradient-card shadow-soft border-2">
            <h3 className="text-xl font-semibold mb-4">Sleep History</h3>
            <div className="space-y-3">
              {sleepData.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No sleep data recorded yet. Start tracking your baby's sleep above!</p>
              ) : (
                sleepData.slice().reverse().map((entry, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold mb-2">{entry.date}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Bedtime</p>
                            <p className="font-medium">{entry.bedtime}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Wake Time</p>
                            <p className="font-medium">{entry.wakeTime}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Total Sleep</p>
                            <p className="font-medium">{entry.totalHours}h</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Cry Episodes</p>
                            <p className="font-medium">{entry.cryEpisodes} ({entry.cryReason})</p>
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

export default SleepAnalyzer;
