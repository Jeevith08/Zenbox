import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { Switch } from "@/components/ui/switch";
import { 
  Mail, 
  User, 
  Shield, 
  Bell, 
  Palette,
  ArrowLeft,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function Settings() {
  const navigate = useNavigate();
  const { user } = useUser();

  // Check if user has selected a role
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      // Redirect to role selection if no role is selected
      navigate('/role-selection');
    }
  }, [navigate]);

  const settingSections = [
    {
      id: "account",
      title: "Account Settings",
      icon: User,
      items: [
        { label: "Profile Information", description: "Update your name and profile picture", type: "button" },
        { label: "Change Role", description: "Switch between School, College, or Professional", type: "button" },
        { label: "Delete Account", description: "Permanently delete your Zenbox account", type: "destructive" }
      ]
    },
    {
      id: "email",
      title: "Email Integration", 
      icon: Mail,
      items: [
        { label: "Connect Gmail", description: "Authorize Zenbox to read your Gmail inbox", type: "button" },
        { label: "Connected Account", description: "john.doe@gmail.com", type: "status", status: "connected" },
        { label: "Sync Frequency", description: "Check for new emails every 5 minutes", type: "select" },
        { label: "Disconnect Gmail", description: "Remove access to your Gmail account", type: "destructive" }
      ]
    },
    {
      id: "categories",
      title: "Email Categories",
      icon: Palette,
      items: [
        { label: "Internships", description: "Show internship opportunities", type: "toggle", enabled: true },
        { label: "Scholarships", description: "Show scholarship notifications", type: "toggle", enabled: true },
        { label: "Job Offers", description: "Show job opportunities", type: "toggle", enabled: true },
        { label: "Events", description: "Show event notifications", type: "toggle", enabled: false },
        { label: "Exams & Results", description: "Show academic notifications", type: "toggle", enabled: true },
        { label: "Fee & Payment", description: "Show payment reminders", type: "toggle", enabled: true }
      ]
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      items: [
        { label: "Email Notifications", description: "Receive email alerts for important messages", type: "toggle", enabled: true },
        { label: "Deadline Reminders", description: "Get notified about approaching deadlines", type: "toggle", enabled: true },
        { label: "Weekly Summary", description: "Receive weekly email activity summary", type: "toggle", enabled: false }
      ]
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      icon: Shield,
      items: [
        { label: "Data Export", description: "Download your email categorization data", type: "button" },
        { label: "Privacy Settings", description: "Manage your data and privacy preferences", type: "button" },
        { label: "Two-Factor Authentication", description: "Add extra security to your account", type: "button" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => window.location.href = "/dashboard"}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Logo size="sm" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your Zenbox preferences</p>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {settingSections.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1, duration: 0.5 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                  </div>

                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-foreground mb-1">{item.label}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>

                        <div className="ml-4">
                          {item.type === "toggle" && (
                            <Switch 
                              checked={item.enabled || false}
                              className="data-[state=checked]:bg-primary"
                            />
                          )}
                          
                          {item.type === "button" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                if (item.label === "Change Role") {
                                  // Clear the current role and redirect to role selection
                                  localStorage.removeItem('userRole');
                                  navigate('/role-selection');
                                } else if (item.label === "Connect Gmail") {
                                  import("@/lib/api").then(async ({ connectGmail }) => {
                                    try {
                                      await connectGmail();
                                      console.info("Gmail OAuth initiated.");
                                      window.location.href = "/dashboard";
                                    } catch (err: any) {
                                      console.error("Connect Gmail error:", err);
                                      alert(`Gmail connection failed: ${err?.message || err}`);
                                    }
                                  });
                                }
                              }}
                            >
                              {item.label === "Change Role" ? "Change" : (item.label === "Connect Gmail" ? "Connect" : "Configure")}
                            </Button>
                          )}
                          
                          {item.type === "destructive" && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                              onClick={() => {
                                if (item.label !== "Delete Account") {
                                  alert("Disconnect not implemented in this build");
                                }
                              }}
                            >
                              {item.label === "Delete Account" ? "Delete" : "Disconnect"}
                            </Button>
                          )}
                          
                          {item.type === "status" && (
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-success rounded-full"></div>
                              <span className="text-sm text-success font-medium">Connected</span>
                            </div>
                          )}
                          
                          {item.type === "select" && (
                            <select className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                              <option>Every 5 minutes</option>
                              <option>Every 15 minutes</option>
                              <option>Every hour</option>
                              <option>Manual only</option>
                            </select>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground mb-4">
            Need help? Check out our{" "}
            <a href="#" className="text-primary hover:underline">documentation</a>{" "}
            or{" "}
            <a href="#" className="text-primary hover:underline">contact support</a>.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button variant="outline">
              Cancel Changes
            </Button>
            <Button className="bg-gradient-primary text-white">
              Save Settings
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}