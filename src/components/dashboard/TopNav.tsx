import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Search, Bell, User, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser, useClerk } from "@clerk/clerk-react";

interface TopNavProps {
  activeCategory: string;
}

export function TopNav({ activeCategory }: TopNavProps) {
  const { user } = useUser();
  const { signOut } = useClerk();

  const getCategoryTitle = (category: string) => {
    const titles = {
      inbox: "Inbox",
      internships: "Internships",
      scholarships: "Scholarships", 
      jobs: "Job Offers",
      events: "Events",
      exams: "Exams & Results",
      payments: "Fee & Payment",
      spam: "Spam"
    };
    return titles[category as keyof typeof titles] || "Inbox";
  };

  const handleSignOut = () => {
    signOut(() => {
      window.location.href = "/";
    });
  };

  return (
    <motion.header
      className="bg-surface border-b border-border px-6 py-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Logo size="sm" />
          <div className="hidden sm:block">
            <h1 className="text-2xl font-bold text-foreground">
              {getCategoryTitle(activeCategory)}
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your {activeCategory} emails
            </p>
          </div>
          <div className="sm:hidden">
            <h1 className="text-lg font-bold text-foreground">
              {getCategoryTitle(activeCategory)}
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search - Hidden on mobile to save space */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search emails..."
              className="w-80 pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
          </Button>

          {/* Settings */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => window.location.href = "/settings"}
            className="hidden sm:flex"
          >
            <Settings className="h-4 w-4" />
          </Button>

          {/* Sign Out */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleSignOut}
            title="Sign Out"
            className="hidden sm:flex"
          >
            <LogOut className="h-4 w-4" />
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="icon" className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-medium">
              {user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0] || "U"}
            </div>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}