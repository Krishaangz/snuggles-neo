import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, CreditCard, Lock, Crown } from "lucide-react";
import { toast } from "sonner";
import { authStore } from "@/stores/authStore";

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  price: string;
  features: string[];
}

const SubscriptionModal = ({
  open,
  onOpenChange,
  planName,
  price,
  features,
}: SubscriptionModalProps) => {
  const [step, setStep] = useState<"details" | "payment" | "processing">("details");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const handleSubscribe = () => {
    setStep("processing");
    
    // Simulate payment processing
    setTimeout(() => {
      const tier = planName.toLowerCase() as 'monthly' | 'annual';
      authStore.upgradeMembership(tier);
      toast.success("Subscription activated successfully!");
      onOpenChange(false);
      
      // Reset modal
      setTimeout(() => {
        setStep("details");
        setCardNumber("");
        setExpiryDate("");
        setCvv("");
        setName("");
        window.location.reload();
      }, 500);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? " / " + v.slice(2, 4) : "");
    }
    return v;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        {step === "details" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                Subscribe to {planName} Plan
              </DialogTitle>
              <DialogDescription>
                Review your subscription details and proceed to payment
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Plan summary */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{planName} Plan</h3>
                    <p className="text-sm text-muted-foreground">Billed {planName === "Monthly" ? "monthly" : "annually"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{price}</p>
                    <p className="text-xs text-muted-foreground">{planName === "Monthly" ? "per month" : "per year"}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <p className="text-sm font-semibold mb-2">Included features:</p>
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Secure payment processing</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our Terms of Service. You can cancel anytime from your settings.
                </p>
              </div>

              <Button
                className="w-full"
                onClick={() => setStep("payment")}
              >
                Continue to Payment
              </Button>
            </div>
          </>
        )}

        {step === "payment" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Payment Details
              </DialogTitle>
              <DialogDescription>
                Enter your card information to complete the subscription
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM / YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    maxLength={7}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    maxLength={3}
                    type="password"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Your payment information is encrypted and secure
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep("details")}
                >
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSubscribe}
                  disabled={!name || !cardNumber || !expiryDate || !cvv || cardNumber.length < 19}
                >
                  Subscribe for {price}
                </Button>
              </div>
            </div>
          </>
        )}

        {step === "processing" && (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Processing Payment</h3>
              <p className="text-sm text-muted-foreground">
                Please wait while we activate your subscription...
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
