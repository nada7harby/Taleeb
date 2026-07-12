import { HeroSection } from "@/components/ui/3d-hero-section-boxes";
import LogoWall from "../components/LogoWall";
import Services from "../components/Services";
import Features from "../components/Features";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Faq";
import Contact from "../components/Contact";
import { TranslationDictionary } from "../types";

interface HomePageProps {
  t: TranslationDictionary;
  locale: "en" | "ar";
}

export default function HomePage({ t, locale }: HomePageProps) {
  return (
    <>
      {/* 1. Immersive 3D Spline Hero Section (app supplies its own Navbar; drop the demo filler) */}
      <HeroSection t={t} locale={locale} showNavbar={false} showPlaceholder={false} />

      {/* 1b. Trusted-by integration logo wall */}
      <LogoWall t={t} locale={locale} />

      {/* 2. Bento-style Services Section */}
      <Services t={t} locale={locale} />

      {/* 3. Gamification Mechanics & Features Section */}
      <Features t={t} locale={locale} />

      {/* 4. Statistics impact metrics Section */}
      <Statistics t={t} locale={locale} />

      {/* 5. Team Testimonials / Client reviews section */}
      <Testimonials t={t} locale={locale} />

      {/* 6. Accordion Frequently Answered Questions */}
      <Faq t={t} locale={locale} />

      {/* 7. Interactive Lead Capturing Form */}
      <Contact t={t} locale={locale} />
    </>
  );
}
