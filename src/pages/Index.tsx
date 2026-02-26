import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { getFeaturedReviews, getSiteContent } from "@/content/siteContent";
import { Seo } from "@/components/seo/Seo";

export default function Index() {
  const siteContent = getSiteContent();
  const shouldShowTestimonials =
    siteContent.visibility.showTestimonialsSection && getFeaturedReviews().length > 0;

  return (
    <Layout>
      <Seo description={siteContent.home.hero.description} />
      <HeroSection />
      <ServicesPreview />
      {shouldShowTestimonials && <TestimonialsSection />}
      <CTASection />
    </Layout>
  );
}
