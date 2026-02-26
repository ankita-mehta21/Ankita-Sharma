import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { ArrowRight, Mail } from "lucide-react";
import { ContentLink } from "@/components/ui/content-link";
import { getSiteContent } from "@/content/siteContent";

export function CTASection() {
  const ctaContent = getSiteContent().home.cta;

  return (
    <section className="section-padding" style={{ background: "var(--gradient-primary)" }}>
      <div className="container-tight text-center">
        <AnimateOnScroll animation="fade-up">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
            {ctaContent.title}
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-up" delay={100}>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            {ctaContent.description}
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-up" delay={200}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 gap-2 bg-white text-primary hover:bg-white/90 btn-hover-scale"
            >
              <ContentLink href={ctaContent.primaryButton.href}>
                {ctaContent.primaryButton.label}
                <ArrowRight className="w-4 h-4" />
              </ContentLink>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 gap-2 border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white btn-hover-scale"
            >
              <ContentLink href={ctaContent.secondaryButton.href}>
                <Mail className="w-4 h-4" />
                {ctaContent.secondaryButton.label}
              </ContentLink>
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
