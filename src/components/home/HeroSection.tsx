import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import { getIconByKey, getImageByKey, getSiteContent } from "@/content/siteContent";

export function HeroSection() {
  const hero = getSiteContent().home.hero;
  const heroDoctorImage = getImageByKey(hero.doctorImageAssetKey) ?? "";

  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-float animation-delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-center min-h-[calc(100vh-5rem)] py-16 lg:py-24">
          {/* Content - takes 3 of 5 columns */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{hero.badgeText}</span>
            </div>

            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground leading-tight mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              {hero.titlePrefix} <span className="gradient-text">{hero.titleHighlight}</span>
            </h1>

            <div
              className="lg:hidden mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "260ms", animationFillMode: "forwards" }}
            >
              <div className="mx-auto w-full max-w-sm rounded-3xl overflow-hidden border border-border/30 shadow-card">
                <img
                  src={heroDoctorImage}
                  alt={hero.doctorImageAlt}
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
            </div>

            <p
              className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              {hero.description}
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              <Button asChild size="lg" className="rounded-full px-8 gap-2 btn-hover-scale">
                <Link to={hero.primaryButton.href}>
                  {hero.primaryButton.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 btn-hover-scale">
                <Link to={hero.secondaryButton.href}>{hero.secondaryButton.label}</Link>
              </Button>
            </div>

            {/* Stats Row - 3 items for visual balance */}
            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
            >
              {hero.stats.map((stat, index) => {
                const StatIcon = getIconByKey(stat.iconKey);
                return (
                  <div key={`${stat.value}-${stat.label}`} className="contents">
                    <div className="flex items-center gap-2.5 group">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                        <StatIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-display text-lg font-bold text-foreground leading-tight">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                    {index < hero.stats.length - 1 && <div className="w-px h-10 bg-border hidden sm:block" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual Card - takes 2 of 5 columns, compact */}
          <div
            className="lg:col-span-2 relative hidden lg:flex justify-center opacity-0 animate-fade-in"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            <div className="relative w-full max-w-xs">
              {/* Main Card */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 shadow-card border border-border/30 p-8 pb-24">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden mb-4 ring-4 ring-primary/10 transition-transform duration-500 hover:scale-105">
                    <img
                      src={heroDoctorImage}
                      alt={hero.doctorImageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{hero.profileCard.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{hero.profileCard.credentials}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {hero.profileCard.tags.map((tag, index) => (
                      <span
                        key={tag}
                        className={
                          index === 0
                            ? "px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                            : "px-3 py-1 rounded-full bg-secondary/15 text-secondary-foreground text-xs font-medium"
                        }
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Review Card */}
              <div
                className="absolute -bottom-4 left-3 right-3 glass-card rounded-2xl p-4 shadow-card opacity-0 animate-slide-up"
                style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {hero.floatingReviewCard.avatarLetters.map((letter) => (
                      <div
                        key={letter}
                        className="w-7 h-7 rounded-full bg-primary/15 border-2 border-card flex items-center justify-center text-[10px] font-medium text-primary"
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5 mb-0.5">
                      {Array.from({ length: hero.floatingReviewCard.starCount }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-warning text-warning" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{hero.floatingReviewCard.label}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
