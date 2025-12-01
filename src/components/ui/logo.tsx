import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  animated?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, animated = false, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-16 w-16"
  };

  const textSizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl"
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        delay: 0.3,
        duration: 0.5
      }
    }
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <motion.img
        src="/logo.png"
        alt="Zenbox Logo"
        className={cn("rounded-xl shadow-glow object-contain", sizeClasses[size])}
        variants={animated ? logoVariants : undefined}
        initial={animated ? "initial" : undefined}
        animate={animated ? "animate" : undefined}
      />
      
      <motion.h1
        className={cn(
          "font-bold bg-gradient-primary bg-clip-text text-transparent",
          textSizeClasses[size]
        )}
        variants={animated ? textVariants : undefined}
        initial={animated ? "initial" : undefined}
        animate={animated ? "animate" : undefined}
      >
        Zenbox
      </motion.h1>
    </div>
  );
}