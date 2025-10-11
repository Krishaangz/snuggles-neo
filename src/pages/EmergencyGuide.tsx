import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, AlertCircle, Phone, Shield, AlertTriangle, Heart, ThermometerSun } from "lucide-react";

interface EmergencyScenario {
  id: string;
  title: string;
  icon: any;
  symptoms: string[];
  immediateActions: string[];
  whenToCallDoctor: string[];
  source: string;
}

const EMERGENCY_SCENARIOS: EmergencyScenario[] = [
  {
    id: "fever",
    title: "High Fever",
    icon: ThermometerSun,
    symptoms: [
      "Temperature above 38°C (100.4°F) in babies under 3 months",
      "Temperature above 39°C (102.2°F) in older babies",
      "Fever lasting more than 24 hours",
      "Baby is unusually sleepy or irritable"
    ],
    immediateActions: [
      "Keep baby hydrated with breast milk or formula",
      "Dress baby lightly and keep room temperature comfortable",
      "Give appropriate dose of infant paracetamol (if over 2 months and advised by doctor)",
      "Monitor temperature every 2 hours",
      "Offer extra fluids"
    ],
    whenToCallDoctor: [
      "Baby under 3 months with any fever",
      "Fever above 40°C (104°F)",
      "Fever with rash, vomiting, or diarrhea",
      "Fever lasting more than 3 days",
      "Baby is not drinking or has dry diapers"
    ],
    source: "NHS & AAP Guidelines"
  },
  {
    id: "choking",
    title: "Choking",
    icon: AlertTriangle,
    symptoms: [
      "Cannot cry or cough",
      "Blue lips or face",
      "Grabbing at throat",
      "Silent or weak coughing",
      "Difficulty breathing"
    ],
    immediateActions: [
      "For conscious baby: Give 5 back blows between shoulder blades",
      "If unsuccessful: Give 5 chest thrusts (like infant CPR)",
      "Alternate between back blows and chest thrusts",
      "Call emergency services immediately if object doesn't dislodge",
      "Never stick fingers in mouth blindly"
    ],
    whenToCallDoctor: [
      "Baby cannot breathe, cough, or cry",
      "Turning blue or losing consciousness",
      "After choking episode, even if resolved",
      "Any concerns about breathing difficulty"
    ],
    source: "Red Cross & WHO"
  },
  {
    id: "breathing",
    title: "Breathing Difficulty",
    icon: Heart,
    symptoms: [
      "Fast or labored breathing",
      "Blue lips or face",
      "Flaring nostrils",
      "Ribs pulling in with each breath",
      "Grunting sounds when breathing"
    ],
    immediateActions: [
      "Keep baby upright",
      "Keep airway clear",
      "Call emergency services immediately",
      "Stay calm and monitor breathing",
      "Do not give food or drink"
    ],
    whenToCallDoctor: [
      "Breathing is very fast or very slow",
      "Blue color around lips or face",
      "Extreme difficulty breathing",
      "Baby is unresponsive",
      "This is always an emergency - call 911/999"
    ],
    source: "AAP & NHS Emergency Guidelines"
  },
  {
    id: "allergic",
    title: "Allergic Reaction",
    icon: AlertCircle,
    symptoms: [
      "Swelling of face, lips, or tongue",
      "Hives or widespread rash",
      "Vomiting or diarrhea",
      "Difficulty breathing or wheezing",
      "Pale skin or feeling faint"
    ],
    immediateActions: [
      "Call emergency services if severe (anaphylaxis suspected)",
      "If prescribed, use epinephrine auto-injector immediately",
      "Keep baby calm and lying down (feet elevated if possible)",
      "Monitor breathing closely",
      "Remove allergen if known"
    ],
    whenToCallDoctor: [
      "Any swelling of face, lips, or tongue",
      "Difficulty breathing or wheezing",
      "Widespread hives",
      "After using epinephrine (always seek emergency care)",
      "Symptoms worsening quickly"
    ],
    source: "AAP & UNICEF"
  },
  {
    id: "head-injury",
    title: "Head Injury",
    icon: Shield,
    symptoms: [
      "Loss of consciousness (even briefly)",
      "Vomiting more than once",
      "Unusual drowsiness or irritability",
      "Clear fluid from nose or ears",
      "Unequal pupil sizes"
    ],
    immediateActions: [
      "Keep baby still and calm",
      "Apply cold compress to bump (not directly on skin)",
      "Monitor for 24 hours",
      "Wake baby every 2-3 hours during first night",
      "Do not give pain medication without doctor's advice"
    ],
    whenToCallDoctor: [
      "Any loss of consciousness",
      "Vomiting more than once",
      "Unusual behavior or extreme fussiness",
      "Clear or bloody fluid from nose or ears",
      "Seizure or convulsion",
      "When in doubt, always call"
    ],
    source: "CDC & NHS"
  },
  {
    id: "dehydration",
    title: "Dehydration",
    icon: AlertTriangle,
    symptoms: [
      "Fewer than 4 wet diapers in 24 hours",
      "Sunken fontanel (soft spot)",
      "Dry mouth and lips",
      "No tears when crying",
      "Sunken eyes"
    ],
    immediateActions: [
      "Continue breastfeeding or formula",
      "Offer small amounts of fluid frequently",
      "Use oral rehydration solution if recommended",
      "Monitor diaper output",
      "Keep baby cool but not cold"
    ],
    whenToCallDoctor: [
      "No wet diaper for 8 hours",
      "Very sunken fontanel",
      "Extreme lethargy",
      "Baby won't take any fluids",
      "Vomiting and diarrhea together"
    ],
    source: "WHO & AAP"
  }
];

const EmergencyGuide = () => {
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState<EmergencyScenario | null>(null);

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
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 border-2 border-accent/20 flex items-center justify-center mx-auto mb-4 animate-pulse-ring">
              <AlertCircle className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Emergency Guide
              </span>
            </h1>
            <p className="text-muted-foreground">
              Quick access to emergency information when you need it most
            </p>
          </div>

          <Card className="p-6 gradient-card shadow-soft border-2 mb-6 bg-destructive/10 border-destructive/30">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="w-8 h-8 text-destructive" />
              <div>
                <h3 className="text-xl font-semibold">Emergency Services</h3>
                <p className="text-sm text-muted-foreground">
                  In case of serious emergency, always call your local emergency number
                </p>
              </div>
            </div>
            <div className="flex gap-3 text-center">
              <div className="flex-1 p-3 bg-background rounded-lg">
                <p className="text-2xl font-bold text-destructive">911</p>
                <p className="text-xs text-muted-foreground">USA</p>
              </div>
              <div className="flex-1 p-3 bg-background rounded-lg">
                <p className="text-2xl font-bold text-destructive">999</p>
                <p className="text-xs text-muted-foreground">UK</p>
              </div>
              <div className="flex-1 p-3 bg-background rounded-lg">
                <p className="text-2xl font-bold text-destructive">112</p>
                <p className="text-xs text-muted-foreground">EU</p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            {EMERGENCY_SCENARIOS.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <Card 
                  key={scenario.id}
                  className="p-6 gradient-card shadow-soft border-2 cursor-pointer hover:border-primary/40 transition-all animate-scale-in hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedScenario(scenario)}
                >
                  <Icon className="w-8 h-8 text-accent mb-3" />
                  <h3 className="text-xl font-semibold mb-2">{scenario.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {scenario.symptoms.slice(0, 2).join(", ")}...
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Emergency Steps
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedScenario} onOpenChange={() => setSelectedScenario(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              {selectedScenario && <selectedScenario.icon className="w-6 h-6 text-primary" />}
              {selectedScenario?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedScenario && (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Symptoms to Watch For
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {selectedScenario.symptoms.map((symptom, i) => (
                    <li key={i}>{symptom}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Immediate Actions
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  {selectedScenario.immediateActions.map((action, i) => (
                    <li key={i} className="ml-2">{action}</li>
                  ))}
                </ol>
              </div>

              <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/30">
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-destructive">
                  <Phone className="w-5 h-5" />
                  When to Call Doctor/Emergency Services
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {selectedScenario.whenToCallDoctor.map((when, i) => (
                    <li key={i}>{when}</li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-muted-foreground">
                Source: {selectedScenario.source}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmergencyGuide;
