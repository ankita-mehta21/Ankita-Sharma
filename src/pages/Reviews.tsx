import { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Button } from "@/components/ui/button";
import { ContentLink } from "@/components/ui/content-link";
import { Seo } from "@/components/seo/Seo";
import { Star, CheckCircle, MessageSquarePlus } from "lucide-react";
import {
  getAverageRating,
  getReviews,
  getSiteContent,
  getTreatmentTypes,
  resolveTemplate,
} from "@/content/siteContent";
import { cn } from "@/lib/utils";

function formatReviewDate(isoDate: string) {
  const d = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export default function Reviews() {
  const siteContent = getSiteContent();
  const reviews = getReviews();
  const treatmentTypes = getTreatmentTypes();
  const reviewsPage = siteContent.reviewsPage;
  const shouldShowShareCta = siteContent.visibility.showReviewsPageShareCta;
  const hasReviews = reviews.length > 0;
  const reviewFormHref = siteContent.externalLinks.reviewForm.trim() || reviewsPage.shareExperience.buttonHref;

  const [filter, setFilter] = useState("all");

  const filteredReviews = filter === "all" ? reviews : reviews.filter((r) => r.treatment === filter);
  const avgRating = hasReviews ? getAverageRating().toFixed(1) : "N/A";

  const ratingSummary = useMemo(() => {
    if (!hasReviews) return "No rating yet.";
    return `${resolveTemplate(reviewsPage.ratingOutOfTextTemplate, { rating: avgRating })}. ${resolveTemplate(reviewsPage.basedOnReviewsTemplate, { count: reviews.length })}.`;
  }, [avgRating, hasReviews, reviews.length, reviewsPage]);

  const filterAnnouncement = useMemo(() => {
    if (!hasReviews) return "No reviews to show yet.";
    if (filteredReviews.length === 0) {
      return `No reviews in this category. Showing 0 of ${reviews.length} reviews. Try another filter.`;
    }
    if (filter === "all") return `Showing all ${filteredReviews.length} reviews.`;
    const label = filteredReviews.length === 1 ? "review" : "reviews";
    return `Showing ${filteredReviews.length} ${label} for ${filter}.`;
  }, [filter, filteredReviews.length, hasReviews, reviews.length]);

  return (
    <Layout>
      <Seo pageTitle={reviewsPage.title} description={reviewsPage.shareExperience.description} />
      <section
        className="relative overflow-hidden py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 right-[-10%] h-72 w-72 rounded-full bg-primary/[0.07] blur-3xl md:right-[5%]" />
          <div className="absolute top-1/3 left-[-15%] h-56 w-56 rounded-full bg-soft-blue/[0.06] blur-3xl md:left-0" />
        </div>
        <div className="container-wide relative px-4 sm:px-6">
          <p className="sr-only" aria-live="polite">
            {ratingSummary}
          </p>
          <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
            <AnimateOnScroll animation="fade-up">
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                {reviewsPage.heroBadge}
              </span>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={80}>
              <h1 className="font-display mb-8 text-balance px-1 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-tight">
                {reviewsPage.title}
              </h1>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={160}>
              <div
                className={cn(
                  "mx-auto max-w-xl rounded-2xl border border-primary/10 bg-card/55 px-5 py-5 shadow-[var(--shadow-soft)] backdrop-blur-sm",
                  "sm:max-w-2xl sm:px-8 sm:py-6"
                )}
              >
                <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 shrink-0 sm:h-7 sm:w-7 ${
                          hasReviews ? "fill-warning text-warning" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <div
                    className="hidden h-12 w-px shrink-0 bg-border/70 sm:block"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 text-center sm:text-left">
                    <p className="break-words font-display text-2xl font-semibold tabular-nums text-foreground sm:text-3xl">
                      {resolveTemplate(reviewsPage.ratingOutOfTextTemplate, { rating: avgRating })}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {resolveTemplate(reviewsPage.basedOnReviewsTemplate, { count: reviews.length })}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0 -mt-8 sm:-mt-10 lg:-mt-12">
        <div className="container-wide max-w-full px-4 sm:px-6">
          {shouldShowShareCta && (
            <AnimateOnScroll animation="fade-up" delay={220}>
              <div
                className={cn(
                  "glass-card relative mx-auto mb-8 overflow-hidden rounded-2xl border border-border/60 shadow-[var(--shadow-card)]",
                  "sm:mb-10 sm:rounded-3xl lg:mb-14 lg:max-w-5xl"
                )}
              >
                <div
                  className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-primary via-primary/90 to-primary/50 sm:rounded-l-3xl"
                  aria-hidden="true"
                />
                <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/25 to-transparent lg:hidden" aria-hidden="true" />
                <div className="relative flex flex-col gap-7 px-5 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:py-10 lg:pl-12">
                  <div className="flex min-w-0 flex-1 flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left lg:gap-8">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 shadow-inner ring-1 ring-primary/10 sm:h-16 sm:w-16">
                      <MessageSquarePlus className="h-7 w-7 text-primary sm:h-8 sm:w-8" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 space-y-2 sm:space-y-3">
                      <h2 className="font-display text-balance text-xl font-semibold text-foreground sm:text-2xl lg:text-3xl lg:tracking-tight">
                        {reviewsPage.shareExperience.title}
                      </h2>
                      <p className="mx-auto max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:mx-0 sm:text-base lg:max-w-2xl lg:text-[1.05rem] lg:leading-relaxed">
                        {reviewsPage.shareExperience.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 justify-center lg:justify-end">
                    <Button
                      asChild
                      size="lg"
                      className={cn(
                        "btn-hover-scale h-auto min-h-11 w-full max-w-md rounded-full px-8 py-3 text-center shadow-lg shadow-primary/20",
                        "whitespace-normal sm:w-auto sm:min-w-[12rem] lg:min-w-[14rem]"
                      )}
                    >
                      <ContentLink
                        href={reviewFormHref}
                        newTabForExternal
                        className="inline-flex items-center justify-center gap-2"
                      >
                        <span className="break-words">{reviewsPage.shareExperience.buttonLabel}</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </ContentLink>
                    </Button>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          )}

          {treatmentTypes.length > 0 && (
            <>
              <p className="sr-only" aria-live="polite" aria-atomic="true">
                {filterAnnouncement}
              </p>
              <AnimateOnScroll animation="fade-up">
                <div
                  role="group"
                  aria-label="Filter reviews by treatment type"
                  className="flex flex-wrap gap-2 sm:gap-2.5 justify-center mb-8 sm:mb-12 w-full max-w-full"
                >
                  <Button
                    type="button"
                    variant={filter === "all" ? "default" : "outline"}
                    aria-pressed={filter === "all"}
                    onClick={() => setFilter("all")}
                    className={cn(
                      "rounded-full min-h-11 h-auto md:min-h-10",
                      "px-3 sm:px-4 py-2.5 sm:py-2 max-w-full",
                      "whitespace-normal text-center text-sm sm:text-sm leading-snug",
                      "inline-flex items-center justify-center"
                    )}
                  >
                    <span className="break-words">{reviewsPage.filters.allLabel}</span>
                  </Button>
                  {treatmentTypes.map((t) => (
                    <Button
                      type="button"
                      key={t}
                      variant={filter === t ? "default" : "outline"}
                      aria-pressed={filter === t}
                      onClick={() => setFilter(t)}
                      className={cn(
                        "rounded-full min-h-11 h-auto md:min-h-10",
                        "px-3 sm:px-4 py-2.5 sm:py-2 max-w-[min(100%,22rem)] sm:max-w-md",
                        "whitespace-normal text-center text-sm sm:text-sm leading-snug",
                        "inline-flex items-center justify-center"
                      )}
                    >
                      <span className="break-words">{t}</span>
                    </Button>
                  ))}
                </div>
              </AnimateOnScroll>
            </>
          )}

          {filteredReviews.length === 0 ? (
            <AnimateOnScroll animation="fade-up">
              <div className="glass-card rounded-2xl p-6 sm:p-8 text-center max-w-lg mx-auto">
                <p className="text-lg font-semibold text-foreground mb-2 text-balance">
                  {hasReviews ? "No reviews in this category" : "Reviews coming soon"}
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-pretty">
                  {hasReviews
                    ? "Try selecting a different treatment filter, or view all reviews."
                    : "Patient testimonials will appear here once they are published."}
                </p>
              </div>
            </AnimateOnScroll>
          ) : (
            <div className={cn(siteContent.layoutConfig.reviewsPage.gridClassName, "w-full max-w-full")}>
              {filteredReviews.map((review, index) => (
                <AnimateOnScroll key={review.id} animation="fade-up" delay={index * 50}>
                  <article
                    className={cn(
                      "glass-card p-5 sm:p-6 rounded-2xl h-full flex flex-col",
                      "hover:border-primary/20 transition-colors duration-300",
                      "min-w-0 max-w-full overflow-hidden"
                    )}
                  >
                    <div className="flex items-center gap-1 mb-3 sm:mb-4 shrink-0" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 shrink-0 transition-all duration-200 ${
                            i <= review.rating ? "fill-warning text-warning" : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <blockquote className="text-foreground leading-relaxed mb-5 sm:mb-6 flex-grow min-w-0">
                      <p className="break-words text-pretty before:content-['\201C'] after:content-['\201D']">
                        {review.review}
                      </p>
                    </blockquote>
                    <div
                      className={cn(
                        "flex flex-wrap items-end justify-between gap-x-3 gap-y-2 mt-auto",
                        "border-t border-border/50 pt-4 min-w-0"
                      )}
                    >
                      <div className="min-w-0 flex-1 basis-[min(100%,12rem)]">
                        <p className="font-semibold text-primary break-words">{review.name}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium break-words hyphens-auto">
                          {review.treatment}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 tabular-nums">
                          <time dateTime={review.date}>{formatReviewDate(review.date)}</time>
                        </p>
                      </div>
                      {review.verified && (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-xs text-success font-medium",
                            "bg-success/10 px-2.5 py-1.5 rounded-full shrink-0",
                            "max-w-full min-h-[2.25rem] box-border"
                          )}
                        >
                          <CheckCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span className="break-words text-left leading-tight">{reviewsPage.reviewCard.verifiedLabel}</span>
                        </span>
                      )}
                    </div>
                  </article>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
