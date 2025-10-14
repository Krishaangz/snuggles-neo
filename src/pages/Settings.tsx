import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Lock, Shield, Trash2, Moon, Sun, Settings as SettingsIcon, Crown, Check, ChevronDown, ChevronUp } from "lucide-react";
import { authStore, useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import SubscriptionModal from "@/components/SubscriptionModal";
import Essentials from "@/components/Essentials";

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { membershipTier } = useAuthStore();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string, features: string[]} | null>(null);
  const [showEssentials, setShowEssentials] = useState(false);

  const membershipPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Sleep & Cry Analyzer",
        "Emergency Guide",
        "Basic insights",
        "Limited daily usage",
      ],
      current: membershipTier === 'free',
    },
  {
    name: "Monthly",
    price: "$9.99",
    period: "per month",
    features: [
      "All Free features",
      "Growth Tracker",
      "Nutrition Planner",
      "Parent Wellness",
      "Expert Content Hub",
      "Smart Insights",
      "SnugBot AI Assistant (unlimited)",
      "Custom experience settings",
      "Priority support",
    ],
    current: membershipTier === 'monthly',
  },
  {
    name: "Annual",
    price: "$99",
    period: "per year",
    popular: true,
    features: [
      "All Monthly features",
      "2 months free",
      "Advanced AI insights",
      "Export data",
      "Custom themes",
      "Early access to new features",
    ],
    current: membershipTier === 'annual',
  },
];

  useEffect(() => {
    const state = authStore.getState();
    if (!state.isAuthenticated) {
      navigate("/auth");
    } else {
      setUserName(state.user?.name || "");
      setEmail(state.user?.email || "");
    }

    const twoFAStatus = localStorage.getItem("two_factor_enabled");
    if (twoFAStatus) {
      setTwoFactorEnabled(JSON.parse(twoFAStatus));
    }
  }, [navigate]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    toast.success("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleToggleTwoFactor = (enabled: boolean) => {
    setTwoFactorEnabled(enabled);
    localStorage.setItem("two_factor_enabled", JSON.stringify(enabled));
    toast.success(enabled ? "2FA enabled" : "2FA disabled");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      authStore.logout();
      localStorage.clear();
      toast.success("Account deleted successfully");
      navigate("/");
    }
  };

  const handleUpgrade = (plan: {name: string, price: string, features: string[]}) => {
    setSelectedPlan(plan);
    setSubscriptionModalOpen(true);
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
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-4">
              <SettingsIcon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Settings
              </span>
            </h1>
            <p className="text-muted-foreground">
              Manage your account, preferences, and membership
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {membershipPlans.map((plan, index) => (
              <Card
                key={index}
                className={`gradient-card shadow-soft border-2 animate-fade-in relative ${
                  plan.popular ? 'border-primary/50' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-xs font-semibold">
                      BEST VALUE
                    </span>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.current && (
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {!plan.current && (
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleUpgrade({
                        name: plan.name,
                        price: plan.price,
                        features: plan.features
                      })}
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <SubscriptionModal
            open={subscriptionModalOpen}
            onOpenChange={setSubscriptionModalOpen}
            planName={selectedPlan?.name || ""}
            price={selectedPlan?.price || ""}
            features={selectedPlan?.features || []}
          />

          <div className="space-y-6">
            <Card className="p-6 gradient-card shadow-medium border-2">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Profile Information
              </h3>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed
                  </p>
                </div>
                <Button type="submit">Update Profile</Button>
              </form>
            </Card>

            <Card className="p-6 gradient-card shadow-medium border-2">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Security
              </h3>
              <form onSubmit={handleChangePassword} className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <Button type="submit">Change Password</Button>
              </form>
              
              <Separator className="my-6" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={handleToggleTwoFactor}
                />
              </div>
            </Card>

            <Card className="p-6 gradient-card shadow-medium border-2">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-primary" />
                Appearance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {theme === "dark" ? (
                      <Moon className="w-5 h-5 text-primary" />
                    ) : (
                      <Sun className="w-5 h-5 text-primary" />
                    )}
                    <div>
                      <p className="font-semibold">Theme</p>
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred theme
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
                  <Crown className="w-4 h-4 inline mr-1" />
                  Custom themes and experience customization available with Monthly or Annual membership
                </p>
              </div>
            </Card>

            <Card className="p-6 gradient-card shadow-medium border-2 border-destructive/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-destructive">
                <Trash2 className="w-5 h-5" />
                Danger Zone
              </h3>
              <p className="text-muted-foreground mb-4">
                Once you delete your account, there is no going back. All your data will be permanently removed.
              </p>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                Delete Account
                </Button>
              </Card>
            </div>

            {/* Essentials Button */}
            <div className="flex justify-center my-8">
              <Button
                onClick={() => setShowEssentials(!showEssentials)}
                variant="outline"
                size="lg"
                className="gap-2 border-2"
              >
                {showEssentials ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                {showEssentials ? "Hide" : "Show"} Essentials
              </Button>
            </div>

            {/* Essentials Section */}
            {showEssentials && (
              <div className="animate-fade-in">
                <Essentials />
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default Settings;
