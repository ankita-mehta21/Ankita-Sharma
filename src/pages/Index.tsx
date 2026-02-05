import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";

import { ServicesPreview } from "@/components/home/ServicesPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

export default function Index() {
  return (
    <Layout>
      <HeroSection />

      <ServicesPreview />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
}
