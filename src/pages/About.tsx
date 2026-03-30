import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { getPrimaryEmail, getPrimaryLocation, getSiteContent } from "@/content/siteContent";
import { getAboutSeoTitle } from "@/content/seoMetadata";
import { Seo } from "@/components/seo/Seo";

export default function About() {
  const siteContent = getSiteContent();
  const aboutPage = siteContent.aboutPage;
  const primaryEmail = getPrimaryEmail();
  const primaryLocation = getPrimaryLocation();
  const credentials = aboutPage.credentialsSection as typeof aboutPage.credentialsSection & {
    certificationsSubTitle?: string;
    licensureTitle?: string;
    licensure?: string[];
  };
  const showLanguages = (siteContent.visibility as typeof siteContent.visibility & { showLanguagesSection?: boolean }).showLanguagesSection !== false;

  return (
    <Layout>
      <Seo pageTitle={getAboutSeoTitle(aboutPage)} description={aboutPage.heroDescription} />
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <AnimateOnScroll animation="fade-up">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {aboutPage.heroBadge}
              </span>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={100}>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
                {aboutPage.heroTitle}
              </h1>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={200}>
              <p className="text-lg text-muted-foreground">
                {aboutPage.heroDescription}
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <span>{primaryEmail || aboutPage.heroEmail}</span>
                <span className="hidden sm:inline">|</span>
                <span>{primaryLocation || aboutPage.heroLocation}</span>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <AnimateOnScroll animation="fade-up">
            <SectionHeader
              badge={aboutPage.summarySection.badge}
              title={aboutPage.summarySection.title}
            />
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={100}>
            <div className="glass-card p-8 rounded-3xl">
              <p className="text-muted-foreground leading-relaxed">{aboutPage.summarySection.summary}</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <AnimateOnScroll animation="fade-up">
            <SectionHeader
              badge={aboutPage.credentialsSection.badge}
              title={aboutPage.credentialsSection.title}
            />
          </AnimateOnScroll>
          <div className="grid lg:grid-cols-2 gap-8">
            <AnimateOnScroll animation="fade-right" delay={100}>
              <div className="glass-card p-8 rounded-3xl h-full">
                <h3 className="font-display text-xl font-semibold mb-4">{aboutPage.credentialsSection.educationTitle}</h3>
                <div className="space-y-4">
                  {aboutPage.credentialsSection.education.map((item) => (
                    <div key={item.degree} className="border-l-2 border-primary/20 pl-4">
                      <p className="font-semibold text-foreground">{item.degree}</p>
                      <p className="text-sm text-muted-foreground">{item.school}</p>
                      <p className="text-sm text-muted-foreground">{item.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-left" delay={100}>
              <div className="glass-card p-8 rounded-3xl h-full">
                <h3 className="font-display text-xl font-semibold mb-4">{credentials.certificationsTitle}</h3>
                {credentials.certificationsSubTitle && (
                  <h4 className="font-display text-base font-semibold text-foreground mb-3">{credentials.certificationsSubTitle}</h4>
                )}
                <ul className="space-y-3 text-muted-foreground">
                  {credentials.certifications.map((cert) => (
                    <li key={cert} className="flex items-start gap-2">
                      <span className="w-2 h-2 mt-2 rounded-full bg-primary" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
                {credentials.licensureTitle && credentials.licensure && credentials.licensure.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-display text-base font-semibold text-foreground mb-3">{credentials.licensureTitle}</h4>
                    <ul className="space-y-3 text-muted-foreground">
                      {credentials.licensure.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="w-2 h-2 mt-2 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section id="experience" className="section-padding">
        <div className="container-wide">
          <AnimateOnScroll animation="fade-up">
            <SectionHeader
              badge={aboutPage.experienceSection.badge}
              title={aboutPage.experienceSection.title}
            />
          </AnimateOnScroll>
          <div className="space-y-6">
            {aboutPage.experienceSection.roles.map((role, index) => (
              <AnimateOnScroll key={role.organization} animation="fade-up" delay={index * 100}>
                <div className="glass-card p-8 rounded-3xl">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground">{role.role}</h3>
                      <p className="text-muted-foreground">
                        {role.organization} - {role.location}
                      </p>
                    </div>
                    <p className="text-primary font-semibold">{role.dates}</p>
                  </div>
                  {role.bullets.length > 0 ? (
                    <ul className="space-y-2 text-muted-foreground">
                      {role.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span className="w-2 h-2 mt-2 rounded-full bg-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">{aboutPage.experienceSection.emptyBulletsFallback}</p>
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="publications" className="section-padding bg-muted/30">
        <div className="container-wide">
          <AnimateOnScroll animation="fade-up">
            <SectionHeader
              badge={aboutPage.publicationsSection.badge}
              title={aboutPage.publicationsSection.title}
            />
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={100}>
            <div className="glass-card p-8 rounded-3xl">
              <ol className="space-y-4 text-muted-foreground list-decimal list-inside">
                {aboutPage.publicationsSection.publications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {showLanguages && (
        <section className="section-padding">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <AnimateOnScroll animation="fade-right">
                <div className="glass-card p-8 rounded-3xl">
                  <SectionHeader
                    badge={aboutPage.languagesSection.badge}
                    title={aboutPage.languagesSection.title}
                    align="left"
                    className="mb-6"
                  />
                  <ul className="mt-6 space-y-3 text-muted-foreground">
                    {aboutPage.languagesSection.languages.map((language) => (
                      <li key={language.language} className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{language.language}</span>
                        <span>{language.level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
