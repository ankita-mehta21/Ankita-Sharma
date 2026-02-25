import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { SectionHeader } from "@/components/ui/section-header";
import { getFeaturedServices, getSiteContent } from "@/content/siteContent";

export function ServicesPreview() {
  const siteContent = getSiteContent();
  const featuredServices = getFeaturedServices();
  const { areasOfPractice } = siteContent.home;
  const { homeServices } = siteContent.layoutConfig;

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        <AnimateOnScroll animation="fade-up">
          <SectionHeader
            badge={areasOfPractice.badge}
            title={areasOfPractice.title}
            subtitle={areasOfPractice.subtitle}
          />
        </AnimateOnScroll>

        <div className={homeServices.gridClassName}>
          {featuredServices.map((service, index) => (
            <AnimateOnScroll key={service.id} animation="fade-up" delay={index * 100}>
              <div className={homeServices.cardClassName}>
                <div className={homeServices.iconContainerClassName}>
                  {service.iconImage ? (
                    <span className="w-full h-full flex items-center justify-center overflow-hidden">
                      <img
                        src={service.iconImage}
                        alt=""
                        aria-hidden="true"
                        className={homeServices.iconImageClassName}
                      />
                    </span>
                  ) : (
                    <service.icon className={homeServices.iconFallbackClassName} />
                  )}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className={homeServices.descriptionClassName}>
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
