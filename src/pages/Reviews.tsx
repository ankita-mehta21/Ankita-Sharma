import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { reviews, treatmentTypes } from "@/data/reviews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Reviews() {
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState({ name: "", treatment: "", rating: 5, review: "" });

  const filteredReviews = filter === "all" ? reviews : reviews.filter(r => r.treatment === filter);
  const avgRating = (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Thank you!", description: "Your review has been submitted for approval." });
    setFormData({ name: "", treatment: "", rating: 5, review: "" });
  };

  return (
    <Layout>
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-wide text-center">
          <AnimateOnScroll animation="fade-up">
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Patient Reviews for Dr. Ankita Sharma
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll animation="scale" delay={100}>
            <div className="flex items-center justify-center gap-2 mb-2">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-warning text-warning" />)}
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={200}>
            <p className="text-2xl font-semibold">{avgRating} out of 5</p>
            <p className="text-muted-foreground">Based on {reviews.length} reviews</p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <AnimateOnScroll animation="fade-up">
            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                variant={filter === "all" ? "default" : "outline"} 
                onClick={() => setFilter("all")}
                className="btn-hover-scale"
              >
                All
              </Button>
              {treatmentTypes.map(t => (
                <Button 
                  key={t} 
                  variant={filter === t ? "default" : "outline"} 
                  onClick={() => setFilter(t)}
                  className="btn-hover-scale"
                >
                  {t}
                </Button>
              ))}
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {filteredReviews.map((review, index) => (
              <AnimateOnScroll key={review.id} animation="fade-up" delay={index * 50}>
                <div className="glass-card p-6 rounded-2xl h-full">
                  <div className="flex items-center gap-1 mb-3">
                    {[1,2,3,4,5].map(i => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 transition-all duration-200 ${i <= review.rating ? "fill-warning text-warning" : "text-muted"}`} 
                      />
                    ))}
                  </div>
                  <p className="text-foreground mb-4">"{review.review}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.treatment}</p>
                    </div>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-xs text-success">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Submit Review Form */}
          <AnimateOnScroll animation="fade-up">
            <div className="max-w-2xl mx-auto glass-card p-8 rounded-3xl">
              <h2 className="font-display text-2xl font-semibold mb-6 text-center">Share Your Experience</h2>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Reviews are reviewed before publishing to the portfolio.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                  placeholder="Your Name (optional)" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                />
                <Select value={formData.treatment} onValueChange={v => setFormData({...formData, treatment: v})}>
                  <SelectTrigger><SelectValue placeholder="Visit type" /></SelectTrigger>
                  <SelectContent>{treatmentTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
                <div>
                  <label className="text-sm font-medium mb-2 block">Rating</label>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <button 
                        key={i} 
                        type="button" 
                        onClick={() => setFormData({...formData, rating: i})}
                        className="transition-transform duration-150 hover:scale-110 active:scale-95"
                      >
                        <Star className={`w-8 h-8 transition-colors duration-200 ${i <= formData.rating ? "fill-warning text-warning" : "text-muted hover:text-warning/50"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <Textarea 
                  placeholder="Your review (all submissions are reviewed before publishing)..." 
                  value={formData.review} 
                  onChange={e => setFormData({...formData, review: e.target.value})} 
                  rows={4} 
                />
                <Button type="submit" className="w-full btn-hover-scale">Submit Review</Button>
              </form>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </Layout>
  );
}
