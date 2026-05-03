import HeroSlider from "@/components/HeroSlider";
import ServicesGrid from "@/components/ServicesGrid";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaBanner from "@/components/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <ServicesGrid />
      <AboutSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
