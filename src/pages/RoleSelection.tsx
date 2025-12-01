import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const currentRole = localStorage.getItem('userRole');

  const roles = [
    {
      id: "school",
      title: "School Student",
      description: "Perfect for high school students managing assignments and college applications",
      icon: "🎒",
      features: ["Assignment tracking", "College application deadlines", "Extracurricular notifications"]
    },
    {
      id: "college",
      title: "College Student",
      description: "Ideal for college students managing internships, scholarships, and career opportunities",
      icon: "🎓",
      features: ["Internship opportunities", "Scholarship deadlines", "Job placement notifications"],
      highlighted: true
    },
    {
      id: "professional",
      title: "Professional",
      description: "Great for recent graduates and working professionals",
      icon: "💼",
      features: ["Job opportunities", "Professional development", "Industry updates"]
    }
  ];

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Logo animated size="lg" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-foreground">
              {currentRole ? "Change Your Role" : "Choose Your Role"}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {currentRole 
                ? `Currently set as: ${roles.find(r => r.id === currentRole)?.title}. Select a new role to update your preferences.`
                : "Let's customize Zenbox to match your needs and organize your emails perfectly."
              }
            </p>
            {currentRole && (
              <p className="text-sm text-primary mt-2 font-medium">
                Your emails will be reorganized based on your new role selection.
              </p>
            )}
          </motion.div>
        </div>

        {/* Role Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {roles.map((role) => (
            <motion.div
              key={role.id}
              variants={cardVariants}
              className={cn(
                "relative bg-surface rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2",
                selectedRole === role.id
                  ? "border-primary shadow-glow"
                  : "border-transparent hover:border-primary/30",
                role.highlighted && "ring-2 ring-primary ring-offset-4 ring-offset-background"
              )}
              onClick={() => setSelectedRole(role.id)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {role.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </span>
                </div>
              )}

              <div className="text-center">
                <div className="text-5xl mb-4">{role.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{role.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {role.description}
                </p>

                <div className="space-y-2 mb-8">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Button
                  variant={selectedRole === role.id ? "hero" : "outline"}
                  size="lg"
                  className="w-full"
                >
                  {selectedRole === role.id ? "Selected" : "Choose This Role"}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Button
            variant="hero"
            size="xl"
            disabled={!selectedRole}
            onClick={() => {
              if (selectedRole) {
                // Save the selected role to localStorage
                localStorage.setItem('userRole', selectedRole);
                // Navigate to dashboard
                navigate("/dashboard");
              }
            }}
          >
            Continue to Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
}