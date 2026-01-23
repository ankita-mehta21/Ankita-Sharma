import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { ArrowRight, Mail } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-padding" style={{ background: "var(--gradient-primary)" }}>
      <div className="container-tight text-center">
        <AnimateOnScroll animation="fade-up">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
            Let's Connect
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-up" delay={100}>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            For patient inquiries, professional collaboration, or community outreach,
            feel free to reach out or share your experience.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-up" delay={200}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 gap-2 bg-white text-primary hover:bg-white/90 btn-hover-scale"
            >
              <Link to="/contact">
                Contact Ankita
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 gap-2 border-white/30 text-white hover:bg-white/10 btn-hover-scale"
            >
              <a href="mailto:ankita.omfp@outlook.com">
                <Mail className="w-4 h-4" />
                Email ankita.omfp@outlook.com
              </a>
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
