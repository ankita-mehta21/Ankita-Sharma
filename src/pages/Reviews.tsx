import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, MessageSquarePlus } from "lucide-react";
import {
  getAverageRating,
  getReviews,
  getSiteContent,
  getTreatmentTypes,
  resolveTemplate,
} from "@/content/siteContent";

export default function Reviews() {
  const siteContent = getSiteContent();
  const reviews = getReviews();
  const treatmentTypes = getTreatmentTypes();
  const reviewsPage = siteContent.reviewsPage;

  const [filter, setFilter] = useState("all");

  const filteredReviews = filter === "all" ? reviews : reviews.filter(r => r.treatment === filter);
  const avgRating = getAverageRating().toFixed(1);

  return (
    <Layout>
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-wide text-center">
          <AnimateOnScroll animation="fade-up">
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              {reviewsPage.title}
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll animation="scale" delay={100}>
            <div className="flex items-center justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-warning text-warning" />
              ))}
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={200}>
            <p className="text-2xl font-semibold">
              {resolveTemplate(reviewsPage.ratingOutOfTextTemplate, { rating: avgRating })}
            </p>
            <p className="text-muted-foreground">
              {resolveTemplate(reviewsPage.basedOnReviewsTemplate, { count: reviews.length })}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section-padding pt-0 -mt-8">
        <div className="container-wide">
          {/* Share Experience CTA */}
          <AnimateOnScroll animation="fade-up" delay={300}>
            <div className="glass-card p-8 rounded-3xl text-center mb-12 max-w-3xl mx-auto border border-white/20 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />
              <MessageSquarePlus className="w-12 h-12 text-primary mx-auto mb-4 opacity-80" />
              <h2 className="font-display text-2xl font-semibold mb-3">
                {reviewsPage.shareExperience.title}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                {reviewsPage.shareExperience.description}
              </p>
              <Button asChild size="lg" className="rounded-full px-8 btn-hover-scale shadow-lg shadow-primary/20">
                <a
                  href={siteContent.externalLinks.reviewForm || reviewsPage.shareExperience.buttonHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {reviewsPage.shareExperience.buttonLabel}
                </a>
              </Button>
            </div>
          </AnimateOnScroll>

          {/* Filters */}
          <AnimateOnScroll animation="fade-up">
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className="rounded-full"
                size="sm"
              >
                {reviewsPage.filters.allLabel}
              </Button>
              {treatmentTypes.map((t) => (
                <Button
                  key={t}
                  variant={filter === t ? "default" : "outline"}
                  onClick={() => setFilter(t)}
                  className="rounded-full"
                  size="sm"
                >
                  {t}
                </Button>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Reviews Grid */}
          <div className={siteContent.layoutConfig.reviewsPage.gridClassName}>
            {filteredReviews.map((review, index) => (
              <AnimateOnScroll key={review.id} animation="fade-up" delay={index * 50}>
                <div className="glass-card p-6 rounded-2xl h-full flex flex-col hover:border-primary/20 transition-colors duration-300">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 transition-all duration-200 ${i <= review.rating ? "fill-warning text-warning" : "text-muted"
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-6 flex-grow">"{review.review}"</p>
                  <div className="flex items-center justify-between mt-auto border-t border-border/50 pt-4">
                    <div>
                      <p className="font-semibold text-primary">{review.name}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">{review.treatment}</p>
                    </div>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-xs text-success font-medium bg-success/10 px-2 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3" /> {reviewsPage.reviewCard.verifiedLabel}
                      </span>
                    )}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
