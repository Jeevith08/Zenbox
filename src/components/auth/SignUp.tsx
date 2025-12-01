import { SignUp } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";

export function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Logo animated size="lg" />
          <h1 className="text-2xl font-bold text-foreground mt-4">
            Join Zenbox
          </h1>
          <p className="text-muted-foreground mt-2">
            Create your account to get started
          </p>
        </div>

        {/* Clerk SignUp Component */}
        <div className="bg-surface rounded-lg p-6 shadow-lg border border-border">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 p-0",
                headerTitle: "text-lg font-semibold text-foreground mb-2",
                headerSubtitle: "text-sm text-muted-foreground mb-6",
                formButtonPrimary: "bg-gradient-primary text-white hover:shadow-glow hover:scale-105 transition-all duration-300 font-medium border-0 rounded-md h-10 px-4 py-2 text-sm",
                formButtonSecondary: "bg-secondary text-white hover:bg-secondary-dark shadow-md hover:shadow-lg transition-all duration-200 rounded-md h-10 px-4 py-2 text-sm font-medium",
                formFieldInput: "bg-background border border-border text-foreground rounded-md h-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200",
                formFieldLabel: "text-foreground text-sm font-medium mb-2 block",
                footerAction: "text-muted-foreground text-sm",
                footerActionLink: "text-primary hover:text-primary-dark font-medium transition-colors duration-200",
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground text-sm",
                socialButtonsBlockButton: "bg-surface border border-border text-foreground hover:bg-surface-hover hover:text-foreground transition-all duration-200 rounded-md h-10 px-4 py-2 text-sm font-medium",
                socialButtonsBlockButtonText: "text-foreground",
                formFieldInputShowPasswordButton: "text-muted-foreground hover:text-foreground transition-colors duration-200",
                formFieldInputShowPasswordButtonIcon: "w-4 h-4",
                formFieldAction: "text-primary hover:text-primary-dark font-medium transition-colors duration-200 text-sm",
                formResendCodeLink: "text-primary hover:text-primary-dark font-medium transition-colors duration-200 text-sm",
                otpCodeFieldInput: "bg-background border border-border text-foreground rounded-md h-12 w-12 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200",
                formFieldRow: "space-y-2",
                formField: "space-y-2",
                formHeader: "text-center mb-6",
                formHeaderTitle: "text-xl font-bold text-foreground",
                formHeaderSubtitle: "text-muted-foreground text-sm",
                formContent: "space-y-4",
                formActions: "space-y-3",
                formFooter: "text-center mt-6 pt-6 border-t border-border",
                alert: "bg-destructive/10 border border-destructive/20 text-destructive rounded-md p-3 text-sm",
                alertText: "text-destructive",
                alertIcon: "text-destructive w-4 h-4",
                verificationCodeInput: "bg-background border border-border text-foreground rounded-md h-12 w-12 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200",
                verificationCodeInputs: "grid grid-cols-6 gap-2",
                formFieldLabelRow: "flex items-center justify-between mb-2",
                formFieldLabelRowLabel: "text-foreground text-sm font-medium",
                formFieldLabelRowSupplement: "text-muted-foreground text-xs",
                formFieldInputRow: "flex items-center gap-2",
                formFieldInputRowInput: "flex-1 bg-background border border-border text-foreground rounded-md h-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200",
                formFieldInputRowButton: "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg transition-all duration-200 rounded-md h-10 px-4 py-2 text-sm font-medium",
                formFieldInputRowButtonText: "text-white",
                phoneNumberInput: "bg-background border border-border text-foreground rounded-md h-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200",
                phoneNumberInputCountrySelect: "bg-background border border-border text-foreground rounded-md h-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200",
                phoneNumberInputRow: "flex items-center gap-2",
                phoneNumberInputRowInput: "flex-1 bg-background border border-border text-foreground rounded-md h-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200",
                phoneNumberInputRowButton: "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg transition-all duration-200 rounded-md h-10 px-4 py-2 text-sm font-medium",
                phoneNumberInputRowButtonText: "text-white",
                phoneNumberInputRowButtonIcon: "w-4 h-4",
                phoneNumberInputRowButtonIconContainer: "flex items-center justify-center",
                phoneNumberInputRowButtonIconContainerIcon: "w-4 h-4",
                phoneNumberInputRowButtonIconContainerIconPath: "fill-current",
                phoneNumberInputRowButtonIconContainerIconRect: "fill-current",
                phoneNumberInputRowButtonIconContainerIconCircle: "fill-current",
                phoneNumberInputRowButtonIconContainerIconPolygon: "fill-current",
                phoneNumberInputRowButtonIconContainerIconLine: "stroke-current",
                phoneNumberInputRowButtonIconContainerIconPolyline: "stroke-current",
                phoneNumberInputRowButtonIconContainerIconPath2: "fill-current",
                phoneNumberInputRowButtonIconContainerIconRect2: "fill-current",
                phoneNumberInputRowButtonIconContainerIconCircle2: "fill-current",
                phoneNumberInputRowButtonIconContainerIconPolygon2: "fill-current",
                phoneNumberInputRowButtonIconContainerIconLine2: "stroke-current",
                phoneNumberInputRowButtonIconContainerIconPolyline2: "stroke-current"
              }
            }}
            redirectUrl="/role-selection"
            signInUrl="/sign-in"
          />
        </div>

        {/* Back to landing */}
        <div className="text-center mt-6">
          <a 
            href="/" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to landing page
          </a>
        </div>
      </motion.div>
    </div>
  );
}
