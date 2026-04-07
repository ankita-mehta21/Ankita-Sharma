import { Layout } from "@/components/layout/Layout";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { ContentLink } from "@/components/ui/content-link";
import { Seo } from "@/components/seo/Seo";
import { getIconByKey, getSiteContent } from "@/content/siteContent";

export default function Contact() {
  const contactPage = getSiteContent().contactPage;

  return (
    <Layout>
      <Seo pageTitle={contactPage.title} description={contactPage.subtitle} />
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-wide text-center">
          <AnimateOnScroll animation="fade-up">
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">{contactPage.title}</h1>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={100}>
            <p className="text-lg text-muted-foreground">{contactPage.subtitle}</p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll animation="fade-up">
              <div className="glass-card p-8 rounded-3xl">
                <div className="grid sm:grid-cols-2 gap-6">
                  {contactPage.contactInfo.map((item, index) => {
                    const ItemIcon = getIconByKey(item.iconKey);
                    return (
                    <AnimateOnScroll key={`${item.title}-${index}`} animation="fade-up" delay={index * 100}>
                      <div className="flex items-start gap-4">
                        <ItemIcon className="w-6 h-6 text-primary" />
                        <div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          {item.href ? (
                            <ContentLink href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                              {item.content}
                            </ContentLink>
                          ) : (
                            <p className="text-muted-foreground whitespace-pre-line">{item.content}</p>
                          )}
                        </div>
                      </div>
                    </AnimateOnScroll>
                  )})}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </Layout>
  );
}
