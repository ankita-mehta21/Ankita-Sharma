import { Layout } from "@/components/layout/Layout";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Mail, MapPin, Briefcase, Languages } from "lucide-react";

export default function Contact() {
  const contactInfo = [
    { icon: Mail, title: "Email", content: "ankita.omfp@outlook.com", href: "mailto:ankita.omfp@outlook.com" },
    { icon: MapPin, title: "Location", content: "Baldwin, MI (Current Practice)" },
    { icon: Briefcase, title: "Current Role", content: "General Dentist - Family Health Care" },
    { icon: Languages, title: "Languages", content: "English (Fluent) • Hindi (Native)" },
  ];

  return (
    <Layout>
      <section className="section-padding" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-wide text-center">
          <AnimateOnScroll animation="fade-up">
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">Contact Ankita</h1>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={100}>
            <p className="text-lg text-muted-foreground">Patient inquiries, referrals, and professional collaborations welcome.</p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll animation="fade-up">
              <div className="glass-card p-8 rounded-3xl">
                <div className="grid sm:grid-cols-2 gap-6">
                  {contactInfo.map((item, index) => (
                    <AnimateOnScroll key={item.title} animation="fade-up" delay={index * 100}>
                      <div className="flex items-start gap-4">
                        <item.icon className="w-6 h-6 text-primary" />
                        <div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          {item.href ? (
                            <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                              {item.content}
                            </a>
                          ) : (
                            <p className="text-muted-foreground whitespace-pre-line">{item.content}</p>
                          )}
                        </div>
                      </div>
                    </AnimateOnScroll>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </Layout>
  );
}
