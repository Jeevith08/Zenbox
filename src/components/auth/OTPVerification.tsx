import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, RefreshCw } from "lucide-react";

interface OTPVerificationProps {
  phoneNumber: string;
  onVerificationComplete: () => void;
  onBack: () => void;
  onResend: () => void;
}

export function OTPVerification({ 
  phoneNumber, 
  onVerificationComplete, 
  onBack, 
  onResend 
}: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) return;

    setIsVerifying(true);
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsVerifying(false);
    onVerificationComplete();
  };

  const handleResend = async () => {
    setIsResending(true);
    await onResend();
    setIsResending(false);
    setTimeLeft(30);
  };

  const isOtpComplete = otp.every(digit => digit !== '');
  const canResend = timeLeft === 0;

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
            <CheckCircle className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Verify your phone number
          </h2>
          <p className="text-muted-foreground text-sm">
            We've sent a 6-digit code to
          </p>
          <p className="text-foreground font-medium">
            {phoneNumber}
          </p>
        </div>

        {/* OTP Input */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3 text-center">
              Enter the 6-digit code
            </label>
            <div className="grid grid-cols-6 gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 bg-background border border-border text-foreground rounded-md text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="0"
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleSubmit}
              disabled={!isOtpComplete || isVerifying}
              className="w-full bg-gradient-primary text-white hover:shadow-glow hover:scale-105 transition-all duration-300"
            >
              {isVerifying ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </div>
              ) : (
                "Verify & Continue"
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={onBack}
              className="w-full"
              disabled={isVerifying}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>

          {/* Resend Code */}
          <div className="text-center">
            {canResend ? (
              <Button
                variant="ghost"
                onClick={handleResend}
                disabled={isResending}
                className="text-primary hover:text-primary-dark"
              >
                {isResending ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Resend Code
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Resend code in {timeLeft}s
              </p>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Didn't receive the code? Check your SMS messages.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

