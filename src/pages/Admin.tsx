import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, LogIn, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getAdminDashboardStats, getAdminRecentReviews, getSiteContent } from "@/content/siteContent";

export default function Admin() {
  const adminPage = getSiteContent().adminPage;
  const recentReviews = getAdminRecentReviews();
  const dashboardStats = getAdminDashboardStats();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      toast({
        title: adminPage.login.welcomeToastTitle,
        description: adminPage.login.welcomeToastDescription,
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--gradient-hero)" }}>
        <div className="glass-card p-8 rounded-3xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-semibold">{adminPage.login.title}</h1>
            <p className="text-muted-foreground text-sm">{adminPage.login.subtitle}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder={adminPage.login.emailPlaceholder}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder={adminPage.login.passwordPlaceholder}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">{adminPage.login.submitLabel}</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border p-4">
        <div className="container-wide flex items-center justify-between">
          <h1 className="font-display text-xl font-semibold">{adminPage.dashboard.title}</h1>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
            {adminPage.dashboard.logoutLabel}
          </Button>
        </div>
      </header>

      <main className="container-wide py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {dashboardStats.map((stat) => (
            <div key={stat.label} className="glass-card p-6 rounded-2xl">
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-xl font-semibold mb-4">{adminPage.dashboard.recentReviewsTitle}</h2>
        <div className="space-y-4">
          {recentReviews.map(review => (
            <div key={review.id} className="glass-card p-6 rounded-2xl flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{review.name}</span>
                  <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className={`w-3 h-3 ${i <= review.rating ? "fill-warning text-warning" : "text-muted"}`} />)}</div>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2">{review.review}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-success"><CheckCircle className="w-4 h-4" /></Button>
                <Button size="sm" variant="outline" className="text-destructive"><XCircle className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
