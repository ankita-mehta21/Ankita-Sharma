import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Clock, GraduationCap, ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-float animation-delay-300" />
      </div>

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-5rem)] py-16 lg:py-24">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            >
              <Star className="w-4 h-4 fill-primary" />
              <span>California Board Certified Dentist</span>
            </div>

            <h1 
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground leading-tight mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              Dr. Ankita Sharma{" "}
              <span className="gradient-text">DMD, MDS</span>
            </h1>

            <p 
              className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              A portfolio of clinical care by a California Board Certified Dentist with 3.5+ years of
              experience in preventive and restorative dentistry, oral surgery, and oral cancer screening.
            </p>

            <div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              <Button asChild size="lg" className="rounded-full px-8 gap-2 btn-hover-scale">
                <Link to="/about">
                  View Portfolio
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 btn-hover-scale">
                <Link to="/reviews">Read Patient Reviews</Link>
              </Button>
            </div>

            {/* Stats */}
            <div 
              className="grid grid-cols-3 gap-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
            >
              <div className="text-center lg:text-left group">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary mb-1">
                  <Clock className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-display text-2xl font-bold">3.5+ Years</span>
                </div>
                <p className="text-sm text-muted-foreground">Clinical Experience</p>
              </div>
              <div className="text-center lg:text-left group">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary mb-1">
                  <GraduationCap className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-display text-2xl font-bold">DMD + MDS</span>
                </div>
                <p className="text-sm text-muted-foreground">Advanced Education</p>
              </div>
              <div className="text-center lg:text-left group">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary mb-1">
                  <ShieldCheck className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-display text-2xl font-bold">CA Board Certified</span>
                </div>
                <p className="text-sm text-muted-foreground">Professional Credential</p>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div 
            className="relative hidden lg:block opacity-0 animate-fade-in"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 shadow-card">
              {/* Placeholder for dentist image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 transition-transform duration-500 hover:scale-105">
                    <span className="font-display text-5xl font-bold text-primary">AS</span>
                </div>
                <p className="text-muted-foreground">Dr. Ankita Sharma</p>
                <p className="text-sm text-muted-foreground/70">DMD, MDS</p>
              </div>
            </div>

              {/* Floating Cards */}
              <div 
                className="absolute bottom-8 left-4 right-4 glass-card rounded-2xl p-4 opacity-0 animate-slide-up"
                style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-xs font-medium text-primary"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-3 h-3 fill-warning text-warning" />
                        ))}
                      </div>
                    <p className="text-xs text-muted-foreground">Verified patient feedback</p>
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
