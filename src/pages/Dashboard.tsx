import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { fetchEmails as fetchBackendEmails, classifyEmail } from "@/lib/api";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { EmailList } from "@/components/dashboard/EmailList";
import { useNavigate } from "react-router-dom";

// Emails state populated from backend (n8n webhook)
// n8n no longer used for fetching emails; using Gmail API directly

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState("inbox");
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<number>(Date.now());
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
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

  const refresh = async () => {
    setLoading(true);
    try {
      const raw = await fetchBackendEmails(10);
      // Classify each email in parallel
      const results = await Promise.all(
        raw.map(async (e, idx) => {
          try {
            const cls = await classifyEmail(e.subject || "", e.snippet || "");
            return {
              id: String(idx + Date.now()),
              sender: e.sender || "",
              subject: e.subject || "",
              snippet: e.snippet || "",
              date: new Date(),
              isRead: false,
              isStarred: false,
              hasAttachment: false,
              category: cls.category || "Inbox",
              confidence: cls.confidence ?? 0.7,
            };
          } catch (err) {
            return {
              id: String(idx + Date.now()),
              sender: e.sender || "",
              subject: e.subject || "",
              snippet: e.snippet || "",
              date: new Date(),
              isRead: false,
              isStarred: false,
              hasAttachment: false,
              category: "Inbox",
              confidence: 0.7,
            };
          }
        })
      );
      setEmails(results);
      setLastRefreshedAt(Date.now());
    } catch (error) {
      console.error("Failed to fetch emails from backend:", error);
      setEmails([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isCancelled = false;
    refresh();
    return () => {
      isCancelled = true;
    };
  }, [user?.id]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const id = setInterval(() => {
      refresh();
    }, 30000);
    return () => clearInterval(id);
  }, []);

  const filteredEmails = activeCategory === "inbox" 
    ? emails 
    : emails.filter(email => (email.category || "").toLowerCase() === activeCategory);

  const handleEmailSelect = (email: any) => {
    setSelectedEmailId(email.id);
    // In a real app, this would open the email details view
  };

  return (
    <div className="h-screen bg-background">
      <Sidebar 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onCollapsedChange={(collapsed) => setSidebarCollapsed(collapsed)}
        counts={emails.reduce((acc: any, e: any) => {
          const key = (e.category || "inbox").toLowerCase();
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, { inbox: emails.length })}
      />
      
      <div className={`${sidebarCollapsed ? "ml-0 lg:ml-16" : "ml-0 lg:ml-64"} flex flex-col h-screen transition-all duration-300`}>
        <TopNav activeCategory={activeCategory} />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Email List Header */}
          <motion.div
            className={`border-b border-border px-6 py-4 ${loading ? "bg-gradient-to-r from-surface via-surface/60 to-surface shimmer" : "bg-surface"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  {loading && (
                    <span className="inline-flex h-4 w-4 border-2 border-primary/60 border-t-transparent rounded-full animate-spin" />
                  )}
                  {loading ? "Loading emails..." : `${filteredEmails.length} emails`}
                </h2>
                <p className="text-xs text-muted-foreground">Last refreshed {new Date(lastRefreshedAt).toLocaleTimeString()}</p>
                <p className="text-sm text-muted-foreground">
                  {filteredEmails.filter(e => !e.isRead).length} unread
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <select className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Sort by date</option>
                  <option>Sort by sender</option>
                  <option>Sort by importance</option>
                </select>
                <button
                  className="text-sm px-3 py-1.5 rounded-lg border border-border hover:bg-surface disabled:opacity-60"
                  onClick={refresh}
                  disabled={loading}
                >
                  {loading ? "Refreshing..." : "Refresh"}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Email List */}
          <EmailList 
            emails={filteredEmails}
            onEmailSelect={handleEmailSelect}
            selectedEmailId={selectedEmailId}
          />
        </main>
      </div>
    </div>
  );
}