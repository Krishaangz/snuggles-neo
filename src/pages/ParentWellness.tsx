import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, Smile, Brain, MessageSquare, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/stores/authStore";

interface MoodEntry {
  date: string;
  mood: string;
  notes: string;
}

const affirmations = [
  "You're doing an amazing job. Your baby is so lucky to have you.",
  "Every moment you spend with your baby matters. You're enough.",
  "It's okay to feel overwhelmed. You're learning and growing every day.",
  "Your love and care make all the difference in your baby's life.",
  "Take time for yourself. You can't pour from an empty cup.",
  "You're stronger than you think, and you're doing better than you realize.",
  "Trust your instincts. You know your baby best.",
  "It's okay to ask for help. Parenting is a team effort.",
];

const breathingExercises = [
  {
    name: "4-7-8 Breathing",
    description: "Breathe in for 4 counts, hold for 7, exhale for 8. Repeat 4 times.",
    duration: "2 minutes",
  },
  {
    name: "Box Breathing",
    description: "Inhale 4 counts, hold 4, exhale 4, hold 4. Repeat 5 times.",
    duration: "3 minutes",
  },
  {
    name: "Deep Belly Breathing",
    description: "Place hand on belly, breathe deeply feeling belly rise and fall.",
    duration: "5 minutes",
  },
];

const ParentWellness = () => {
  const navigate = useNavigate();
  const { isPremium } = useAuthStore();
  const [moodData, setMoodData] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState("");
  const [notes, setNotes] = useState("");
  const [dailyAffirmation, setDailyAffirmation] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("parent_wellness_data");
    if (userData) {
      setMoodData(JSON.parse(userData));
    }
    
    // Set daily affirmation
    const today = new Date().toDateString();
    const savedAffirmation = localStorage.getItem("daily_affirmation");
    const savedDate = localStorage.getItem("affirmation_date");
    
    if (savedDate === today && savedAffirmation) {
      setDailyAffirmation(savedAffirmation);
    } else {
      const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
      setDailyAffirmation(randomAffirmation);
      localStorage.setItem("daily_affirmation", randomAffirmation);
      localStorage.setItem("affirmation_date", today);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: MoodEntry = {
      date: new Date().toLocaleDateString(),
      mood: currentMood,
      notes,
    };

    const updatedData = [...moodData, newEntry];
    setMoodData(updatedData);
    localStorage.setItem("parent_wellness_data", JSON.stringify(updatedData));
    
    toast.success("Mood logged successfully!");
    setCurrentMood("");
    setNotes("");
  };

  const getMoodIcon = (mood: string) => {
    const icons: Record<string, string> = {
      great: "😊",
      good: "🙂",
      okay: "😐",
      tired: "😴",
      stressed: "😰",
    };
    return icons[mood] || "😐";
  };

  const getRecentMoods = () => {
    return moodData.slice(-7).map(entry => getMoodIcon(entry.mood)).join(" ");
  };

  const analyzeWellness = async () => {
    if (!isPremium()) {
      toast.error("Premium Feature - Upgrade to unlock AI wellness analysis");
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-wellness", {
        body: { wellnessData: moodData },
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
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-4 animate-float">
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

          <Card className="p-6 gradient-card shadow-medium border-2 mb-8 animate-fade-in">
            <div className="flex items-start gap-4">
              <Sparkles className="w-8 h-8 text-primary mt-1 animate-glow-pulse" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Daily Affirmation</h3>
                <p className="text-lg leading-relaxed">{dailyAffirmation}</p>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card className="gradient-card shadow-soft border-2 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smile className="w-5 h-5 text-primary" />
                  Mood Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{moodData.length}</p>
                <p className="text-sm text-muted-foreground mt-2">Total logged</p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-soft border-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-accent" />
                  Recent Mood
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">{getRecentMoods() || "No data yet"}</p>
                <p className="text-sm text-muted-foreground mt-2">Last 7 days</p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-soft border-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-secondary" />
                  Wellness Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {moodData.length > 0 ? "Good" : "N/A"}
                </p>
                <p className="text-sm text-muted-foreground mt-2">Keep it up!</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 gradient-card shadow-medium border-2">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Log Your Mood
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Select value={currentMood} onValueChange={setCurrentMood} required>
                    <SelectTrigger>
                      <SelectValue placeholder="How are you feeling today?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="great">😊 Great - Feeling energized</SelectItem>
                      <SelectItem value="good">🙂 Good - Pretty okay</SelectItem>
                      <SelectItem value="okay">😐 Okay - Getting by</SelectItem>
                      <SelectItem value="tired">😴 Tired - Need rest</SelectItem>
                      <SelectItem value="stressed">😰 Stressed - Overwhelmed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="What's on your mind? (optional)"
                    rows={4}
                  />
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">Log Mood</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1" 
                    onClick={analyzeWellness}
                    disabled={isAnalyzing || moodData.length === 0}
                  >
                    {isAnalyzing ? "Analyzing..." : "AI Analysis"}
                  </Button>
                </div>
              </form>
            </Card>

            <Card className="p-6 gradient-card shadow-soft border-2">
              <h3 className="text-xl font-semibold mb-4">Breathing Exercises</h3>
              <div className="space-y-4">
                {breathingExercises.map((exercise, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{exercise.name}</h4>
                      <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                        {exercise.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{exercise.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {aiAnalysis && (
            <Card className="p-6 mb-8 animate-fade-in border-primary/20">
              <div className="flex gap-3">
                <AlertCircle className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">WHO Wellness Analysis</h3>
                  <div className="text-muted-foreground whitespace-pre-wrap">{aiAnalysis}</div>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6 gradient-card shadow-soft border-2">
            <h3 className="text-xl font-semibold mb-4">Mood Journal</h3>
            <div className="space-y-3">
              {moodData.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No mood entries yet. Start tracking your emotional wellness above!</p>
              ) : (
                moodData.slice().reverse().map((entry, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{getMoodIcon(entry.mood)}</span>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-semibold">{entry.date}</p>
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
                            {entry.mood}
                          </span>
                        </div>
                        {entry.notes && (
                          <p className="text-sm text-muted-foreground mt-2">{entry.notes}</p>
                        )}
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

export default ParentWellness;
