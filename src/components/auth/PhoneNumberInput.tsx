import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Phone } from "lucide-react";

interface PhoneNumberInputProps {
  onPhoneSubmit: (phone: string) => void;
  onBack: () => void;
}

export function PhoneNumberInput({ onPhoneSubmit, onBack }: PhoneNumberInputProps) {
  const [phoneNumber, setPhoneNumber] = useState("+91 93847-36809");
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhoneNumber = (phone: string) => {
    // Remove all non-digit characters except +
    const cleaned = phone.replace(/[^\d+]/g, '');
    // Check if it's a valid Indian phone number (10 digits after +91)
    const indianPhoneRegex = /^\+91\d{10}$/;
    return indianPhoneRegex.test(cleaned);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    
    if (value.trim()) {
      setIsValid(validatePhoneNumber(value));
    } else {
      setIsValid(true);
    }
  };

  const handleSubmit = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setIsValid(false);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    onPhoneSubmit(phoneNumber);
  };

  const formatPhoneNumber = (value: string) => {
    // Format Indian phone number as +91 XXXXX-XXXXX
    const cleaned = value.replace(/[^\d]/g, '');
    if (cleaned.startsWith('91') && cleaned.length >= 12) {
      const number = cleaned.substring(2);
      if (number.length === 10) {
        return `+91 ${number.substring(0, 5)}-${number.substring(5)}`;
      }
    }
    return value;
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-surface rounded-lg p-6 shadow-lg border border-border">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Enter your phone number
          </h2>
          <p className="text-muted-foreground text-sm">
            We'll send you a verification code
          </p>
        </div>

        {/* Phone Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone Number
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0">
                <div className="bg-background border border-border rounded-md px-3 py-2 text-sm font-medium text-foreground">
                  IN +91
                </div>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                onBlur={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                className={`flex-1 bg-background border border-border text-foreground rounded-md h-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                  !isValid ? 'border-destructive' : ''
                }`}
                placeholder="Enter your phone number"
              />
            </div>
            
            {/* Validation Message */}
            {!isValid && (
              <motion.div
                className="flex items-center gap-2 mt-2 text-destructive text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="w-4 h-4" />
                Please enter a valid 10-digit Indian phone number
              </motion.div>
            )}
            
            {/* Success Message */}
            {isValid && phoneNumber && (
              <motion.div
                className="flex items-center gap-2 mt-2 text-success text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle className="w-4 h-4" />
                Valid phone number format
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex-1"
              disabled={isSubmitting}
            >
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              className="flex-1 bg-gradient-primary text-white hover:shadow-glow hover:scale-105 transition-all duration-300"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            By continuing, you agree to receive SMS messages for verification.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

