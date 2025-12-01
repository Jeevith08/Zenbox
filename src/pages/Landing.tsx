import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export default function Landing() {
  const navigate = useNavigate();
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Logo animated size="md" />
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary"
              onClick={() => navigate("/sign-in")}
            >
              Login
            </Button>
            <Button 
              variant="hero" 
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight"
            variants={fadeInUp}
          >
            Your smart inbox,{" "}
            <span className="block">organized for your future</span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Zenbox automatically categorizes your college emails using AI, helping you never miss important deadlines, scholarships, or opportunities.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            variants={fadeInUp}
          >
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => navigate("/role-selection")}
            >
              Get Started Free
            </Button>
            <Button 
              variant="glass" 
              size="xl"
              onClick={() => navigate("/dashboard")}
            >
              Try Demo
            </Button>
          </motion.div>

          <motion.div
            className="relative max-w-4xl mx-auto"
            variants={fadeInUp}
          >
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-3xl"></div>
            <img
              src={heroImage}
              alt="Zenbox Dashboard Preview"
              className="relative rounded-2xl shadow-2xl w-full h-auto"
            />
          </motion.div>
        </motion.div>
      </main>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Built for College Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every feature designed to help you focus on what matters most - your education and future.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Smart Categorization",
              description: "Automatically sorts emails into Scholarships, Internships, Job Offers, and more.",
              icon: "🎯"
            },
            {
              title: "Deadline Tracking",
              description: "Never miss important deadlines with intelligent reminder notifications.",
              icon: "⏰"
            },
            {
              title: "Gmail Integration",
              description: "Seamlessly connects with your existing Gmail account for instant setup.",
              icon: "📧"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-surface rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to organize your future?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have transformed their email management with Zenbox.
            </p>
            <Button 
              variant="glass" 
              size="xl"
              onClick={() => navigate("/role-selection")}
            >
              Start Your Journey
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo size="sm" />
            <p className="text-muted-foreground text-sm mt-4 md:mt-0">
              © 2024 Zenbox. Built for student success.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}