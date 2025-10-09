import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle, Phone, Shield } from "lucide-react";

const EmergencyGuide = () => {
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

          <Card className="p-6 gradient-card shadow-soft border-2 mb-6 bg-accent/5">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="w-8 h-8 text-accent" />
              <div>
                <h3 className="text-xl font-semibold">Emergency Services</h3>
                <p className="text-sm text-muted-foreground">
                  In case of emergency, always call your local emergency number
                </p>
              </div>
            </div>
            <p className="text-accent font-semibold">
              ⚠️ For serious emergencies, seek immediate medical attention
            </p>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 gradient-card shadow-soft border-2">
              <Shield className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Common Emergencies</h3>
              <p className="text-muted-foreground mb-4">
                Step-by-step guides for fever, choking, minor injuries, and other common situations.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Interactive emergency cards with voice navigation
              </div>
            </Card>

            <Card className="p-6 gradient-card shadow-soft border-2">
              <AlertCircle className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">First Aid Guide</h3>
              <p className="text-muted-foreground mb-4">
                Essential first aid procedures verified by Red Cross and WHO guidelines.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Visual first aid instructions and video demonstrations
              </div>
            </Card>

            <Card className="p-6 gradient-card shadow-soft border-2 md:col-span-2">
              <Phone className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Emergency Contacts</h3>
              <p className="text-muted-foreground mb-4">
                Store and quickly access important medical contacts, pediatrician info, and emergency numbers.
              </p>
              <div className="text-sm text-muted-foreground">
                Coming soon: Quick-dial emergency contacts and hospital locator
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyGuide;
