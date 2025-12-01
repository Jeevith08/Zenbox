import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { 
  Inbox, 
  GraduationCap, 
  Target, 
  Briefcase, 
  Calendar, 
  FileText, 
  CreditCard, 
  Shield,
  Settings,
  Search,
  Menu,
  X,
  PenSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  counts?: Record<string, number>;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function Sidebar({ activeCategory, onCategoryChange, counts = {}, onCollapsedChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const categories = [
    { id: "inbox", label: "📥 Inbox", icon: Inbox },
    { id: "internships", label: "🎓 Internships", icon: GraduationCap },
    { id: "scholarships", label: "🎯 Scholarships", icon: Target },
    { id: "jobs", label: "💼 Job Offers", icon: Briefcase },
    { id: "events", label: "📅 Events", icon: Calendar },
    { id: "exams", label: "📝 Exams & Results", icon: FileText },
    { id: "payments", label: "💰 Fee & Payment", icon: CreditCard },
    { id: "spam", label: "🚫 Spam", icon: Shield }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      <motion.aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-surface border-r border-border flex flex-col transition-all duration-300",
          isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "w-64"
        )}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with toggle */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!isCollapsed && (
            <motion.h2 
              className="text-lg font-semibold text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Zenbox
            </motion.h2>
          )}
          <button
            onClick={() => {
              const next = !isCollapsed;
              setIsCollapsed(next);
              onCollapsedChange?.(next);
            }}
            className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </button>
        </div>

        {/* Compose Button */}
        <div className="p-4 border-b border-border">
          <Button
            onClick={() => window.location.href = "/compose"}
            className="w-full bg-gradient-primary text-white hover:shadow-glow hover:scale-105 transition-all duration-300 font-medium border-0 rounded-lg h-11 px-4 py-2.5 text-sm flex items-center justify-center gap-2 shadow-md"
          >
            <PenSquare className="h-4 w-4" />
            {!isCollapsed && <span>Compose</span>}
          </Button>
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search emails..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Categories */}
        <nav className="flex-1 p-4 space-y-1">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 text-left rounded-lg transition-all duration-200",
                  activeCategory === category.id
                    ? "bg-primary/10 text-primary border border-primary/20 font-semibold"
                    : "text-muted-foreground hover:bg-secondary/10 hover:text-foreground"
                )}
                onClick={() => onCategoryChange(category.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{`${category.label}`}</span>
                  )}
                </div>
                {!isCollapsed && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-foreground/80">
                    {counts[category.id] ?? 0}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="p-4 border-t border-border">
          <button 
            className="w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg text-muted-foreground hover:bg-secondary/10 hover:text-foreground transition-all duration-200"
            onClick={() => window.location.href = "/settings"}
          >
            <Settings className="h-4 w-4 flex-shrink-0" />
            {!isCollapsed && (
              <span className="text-sm font-medium">Settings</span>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  );
}