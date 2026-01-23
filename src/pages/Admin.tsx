import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { reviews } from "@/data/reviews";
import { CheckCircle, XCircle, LogIn, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      toast({ title: "Welcome!", description: "You're now logged in." });
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
            <h1 className="font-display text-2xl font-semibold">Portfolio Admin</h1>
            <p className="text-muted-foreground text-sm">Sign in to review submissions</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border p-4">
        <div className="container-wide flex items-center justify-between">
          <h1 className="font-display text-xl font-semibold">Review Management</h1>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)}>Logout</Button>
        </div>
      </header>

      <main className="container-wide py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 rounded-2xl">
            <p className="text-muted-foreground text-sm">Total Reviews</p>
            <p className="text-3xl font-bold">{reviews.length}</p>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <p className="text-muted-foreground text-sm">Pending Approval</p>
            <p className="text-3xl font-bold">3</p>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <p className="text-muted-foreground text-sm">New Messages</p>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>

        <h2 className="font-display text-xl font-semibold mb-4">Recent Reviews</h2>
        <div className="space-y-4">
          {reviews.slice(0, 5).map(review => (
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
