import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { SectionHeader } from "@/components/ui/section-header";
import { services } from "@/data/services";

export function ServicesPreview() {
  const featuredServices = services.slice(0, 4);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        <AnimateOnScroll animation="fade-up">
          <SectionHeader
            badge="Clinical Focus"
            title="Areas of Practice"
            subtitle="A portfolio of preventive, restorative, and surgical dental care with an emphasis on patient education and outcomes."
          />
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service, index) => (
            <AnimateOnScroll key={service.id} animation="fade-up" delay={index * 100}>
              <div className="group glass-card rounded-2xl p-6 hover-lift h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {service.shortDescription}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
