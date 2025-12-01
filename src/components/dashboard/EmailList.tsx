import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Star, Paperclip, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Email {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  date: Date;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
  category: string;
  confidence: number;
  isUrgent?: boolean;
}

interface EmailListProps {
  emails: Email[];
  onEmailSelect: (email: Email) => void;
  selectedEmailId: string | null;
}

export function EmailList({ emails, onEmailSelect, selectedEmailId }: EmailListProps) {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      internships: "text-primary",
      scholarships: "text-secondary",
      jobs: "text-success",
      events: "text-warning",
      exams: "text-destructive",
      payments: "text-orange-500",
      spam: "text-gray-500"
    };
    return colors[category as keyof typeof colors] || "text-muted-foreground";
  };

  return (
    <motion.div
      className="flex-1 bg-background overflow-y-auto"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {emails.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center h-full text-center p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No emails yet</h3>
          <p className="text-muted-foreground max-w-md">
            Your inbox is clean and ready for new emails. Connect your email account to get started with Zenbox.
          </p>
        </motion.div>
      ) : (
        <div className="divide-y divide-border">
          {emails.map((email) => (
            <motion.div
              key={email.id}
              variants={itemVariants}
              className={cn(
                "p-4 cursor-pointer transition-all duration-200 hover:bg-surface-hover",
                selectedEmailId === email.id && "bg-surface border-r-2 border-primary",
                !email.isRead && "bg-surface/50"
              )}
              onClick={() => onEmailSelect(email)}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox/Avatar */}
                <div className="mt-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-medium">
                    {email.sender.split(' ').map(name => name[0]).join('').slice(0, 2)}
                  </div>
                </div>

                {/* Email Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={cn(
                      "font-medium truncate",
                      email.isRead ? "text-foreground" : "text-foreground font-semibold"
                    )}>
                      {email.sender}
                    </h3>
                    
                    {email.isUrgent && (
                      <div className="flex items-center gap-1 text-destructive">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs font-medium">URGENT</span>
                      </div>
                    )}
                    
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium",
                      getCategoryColor(email.category),
                      "bg-current/10"
                    )}>
                      {email.category}
                    </span>
                  </div>

                  <h4 className={cn(
                    "text-sm mb-1 truncate",
                    email.isRead ? "text-muted-foreground" : "text-foreground font-medium"
                  )}>
                    {email.subject}
                  </h4>

                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {email.snippet}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatDistanceToNow(email.date, { addSuffix: true })}</span>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-current rounded-full opacity-50"></div>
                        <span>{Math.round(email.confidence * 100)}% confidence</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {email.hasAttachment && (
                        <Paperclip className="h-3 w-3 text-muted-foreground" />
                      )}
                      <button
                        className={cn(
                          "p-1 rounded transition-colors",
                          email.isStarred ? "text-warning" : "text-muted-foreground hover:text-warning"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle star toggle
                        }}
                      >
                        <Star className={cn("h-3 w-3", email.isStarred && "fill-current")} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}