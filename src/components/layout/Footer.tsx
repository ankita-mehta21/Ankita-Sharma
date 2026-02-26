import { ContentLink } from "@/components/ui/content-link";
import { getIconByKey, getSiteContent, resolveTemplate } from "@/content/siteContent";

export function Footer() {
  const siteContent = getSiteContent();
  const footerContent = siteContent.layout.footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background/90">
      {/* Main Footer */}
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <ContentLink href="/" className="inline-block mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-xl font-display font-bold text-primary-foreground">
                    {siteContent.siteMeta.brandInitials}
                  </span>
                </div>
                <div>
                  <span className="font-display text-lg font-semibold text-background">
                    {siteContent.siteMeta.brandName}
                  </span>
                </div>
              </div>
            </ContentLink>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              {footerContent.summary}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <ContentLink
                href={footerContent.primaryCta.href}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {footerContent.primaryCta.label}
              </ContentLink>
              <ContentLink
                href={footerContent.secondaryCta.href}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-background/20 text-background/80 text-sm font-medium hover:text-primary hover:border-primary/50 transition-colors"
              >
                {footerContent.secondaryCta.label}
              </ContentLink>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold text-background mb-5">
              {footerContent.detailsTitle}
            </h3>
            <ul className="space-y-4">
              {footerContent.details.map((detail) => {
                const DetailIcon = getIconByKey(detail.iconKey);
                return (
                  <li key={`${detail.iconKey}-${detail.text}`} className="flex items-start gap-3">
                    <DetailIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    {detail.href ? (
                      <a href={detail.href} className="text-background/70 hover:text-primary text-sm transition-colors">
                        {detail.text}
                      </a>
                    ) : (
                      <span className="text-background/70 text-sm">{detail.text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/60 text-sm text-center md:text-left">
              {resolveTemplate(footerContent.copyrightTemplate, { year: currentYear })}
            </p>
            <ContentLink
              href={footerContent.bottomLink.href}
              className="text-background/60 hover:text-primary text-sm transition-colors"
            >
              {footerContent.bottomLink.label}
            </ContentLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
