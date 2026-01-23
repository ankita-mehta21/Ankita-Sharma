import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, Briefcase } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", topic: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Thank you!", description: "Your message has been received. Responses typically arrive within 1-2 business days." });
    setFormData({ name: "", email: "", phone: "", topic: "", message: "" });
  };

  const topics = [
    "Patient Inquiry",
    "Professional Collaboration",
    "Speaking or Publication",
    "Community Outreach",
    "Other",
  ];

  const contactInfo = [
    { icon: Mail, title: "Email", content: "ankita.omfp@outlook.com", href: "mailto:ankita.omfp@outlook.com" },
    { icon: MapPin, title: "Location", content: "Baldwin, MI (Current Practice)" },
    { icon: Briefcase, title: "Current Role", content: "General Dentist - Family Health Care" },
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
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimateOnScroll animation="fade-right">
                <div className="glass-card p-8 rounded-3xl">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input 
                        placeholder="Your Name *" 
                        required 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                      />
                      <Input 
                        type="email" 
                        placeholder="Email *" 
                        required 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input 
                        type="tel" 
                        placeholder="Phone Number (optional)" 
                        value={formData.phone} 
                        onChange={e => setFormData({...formData, phone: e.target.value})} 
                      />
                      <Select value={formData.topic} onValueChange={v => setFormData({...formData, topic: v})}>
                        <SelectTrigger><SelectValue placeholder="Reason for reaching out" /></SelectTrigger>
                        <SelectContent>
                          {topics.map((topic) => (
                            <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Textarea 
                      placeholder="How can I help you?" 
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})} 
                      rows={4} 
                    />
                    <Button type="submit" size="lg" className="w-full btn-hover-scale">
                      Send Message
                    </Button>
                  </form>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((item, index) => (
                <AnimateOnScroll key={item.title} animation="fade-left" delay={index * 100}>
                  <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
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
        </div>
      </section>
    </Layout>
  );
}
