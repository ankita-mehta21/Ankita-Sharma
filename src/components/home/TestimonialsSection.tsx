import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { ContentLink } from "@/components/ui/content-link";
import { getFeaturedReviews, getSiteContent, resolveTemplate } from "@/content/siteContent";

export function TestimonialsSection() {
  const siteContent = getSiteContent();
  const { testimonials } = siteContent.home;
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredReviews = getFeaturedReviews();
  const hasFeaturedReviews = featuredReviews.length > 0;

  useEffect(() => {
    if (!hasFeaturedReviews) {
      return;
    }
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredReviews.length);
    }, testimonials.autoplayMs);
    return () => clearInterval(timer);
  }, [hasFeaturedReviews, featuredReviews.length, testimonials.autoplayMs]);

  useEffect(() => {
    if (!hasFeaturedReviews) {
      setCurrentIndex(0);
      return;
    }
    if (currentIndex >= featuredReviews.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, hasFeaturedReviews, featuredReviews.length]);

  if (!hasFeaturedReviews) {
    return null;
  }

  const goToPrevious = () => {
    if (featuredReviews.length === 0) {
      return;
    }
    setCurrentIndex((prev) => (prev - 1 + featuredReviews.length) % featuredReviews.length);
  };

  const goToNext = () => {
    if (featuredReviews.length === 0) {
      return;
    }
    setCurrentIndex((prev) => (prev + 1) % featuredReviews.length);
  };

  const currentReview = featuredReviews[currentIndex];
  const starCount = currentReview?.rating ?? 5;

  return (
    <section className="section-padding">
      <div className="container-wide">
        <AnimateOnScroll animation="fade-up">
          <SectionHeader
            badge={testimonials.badge}
            title={testimonials.title}
            subtitle={testimonials.subtitle}
          />
        </AnimateOnScroll>

        <AnimateOnScroll animation="scale">
          <div className="max-w-4xl mx-auto">
            <div className="relative glass-card rounded-3xl p-8 md:p-12">
              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-primary/20 absolute top-8 left-8" />

              <div className="relative text-center">
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 transition-transform duration-200 hover:scale-110 ${
                        i <= starCount ? "fill-warning text-warning" : "text-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8 min-h-[120px] transition-opacity duration-300">
                  "{currentReview?.review}"
                </blockquote>

                {/* Patient Info */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-semibold text-primary">
                      {currentReview?.name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{currentReview?.name}</p>
                    <p className="text-sm text-muted-foreground">{currentReview?.treatment}</p>
                  </div>
                  {currentReview?.verified && (
                    <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                      {testimonials.verifiedLabel}
                    </span>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={goToPrevious}
                  className="w-10 h-10 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                  aria-label={testimonials.previousAriaLabel}
                >
                  <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                </button>
                <div className="flex gap-2">
                  {featuredReviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "w-6 bg-primary"
                          : "bg-border hover:bg-muted-foreground/30"
                      }`}
                      aria-label={resolveTemplate(testimonials.dotAriaLabelTemplate, {
                        index: index + 1,
                      })}
                    />
                  ))}
                </div>
                <button
                  onClick={goToNext}
                  className="w-10 h-10 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                  aria-label={testimonials.nextAriaLabel}
                >
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="rounded-full btn-hover-scale">
                <ContentLink href={testimonials.ctaHref}>{testimonials.ctaLabel}</ContentLink>
              </Button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
